<script lang="ts" setup>
import { computedEager, useOffsetPagination } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import type { CustomFilter } from '../composables/useSearch'
import { useSearch } from '~/composables/useSearch'
import type { CustomSort, typeSortBy } from '~/composables/useSort'
import { useSort } from '~/composables/useSort'

export type ShallSortByAsc = boolean | null

export interface PropColumn {
  title: string
  name: string
  width?: string
  isFilterable?: boolean

  // TODO(TS): Improve typing
  filterBy?: CustomFilter<any>
  isSortable?: boolean
  sortBy?: CustomSort
  formatter?: (val: unknown) => unknown
}

export interface TableColumn extends PropColumn {
  shallSortByAsc: ShallSortByAsc
}

export interface ItemsFunctionParams {
  q: string
  currentPage: number
  rowsPerPage: number
  sortedCols: TableColumn[]
}

export interface ItemsFunction {
  (props: ItemsFunctionParams): Promise<{ rows: unknown[]; total: number }>
}

interface ITableProps {
  rows: Object[] | ItemsFunction
  columns: PropColumn[]
  search: boolean
  noResultsText?: string
  isSortable: boolean
  multiSort: boolean
  pageSize: number
}
const props = defineProps<ITableProps>()

// 👉 isSST
const isSST = computedEager(() => !Array.isArray(props.rows))

// 👉 _rows
// If rows prop is array directly set it else table data comes from server hence we will assign blank array as initial rows data
const _rows = computed(() => (isSST.value ? [] : props.rows))
// 👉 Server rows
let _serverRows = $ref<Object[]>([])
let _serverTotal = $ref(0)

// 👉 Search
let _search = $ref('')

// 👉 Column defaults
const columnDefaults = {
  isFilterable: true,
  isSortable: true,
  shallSortByAsc: null
}

// 👉 _columns
// If columns are provided via prop
const _columns: Ref<TableColumn[]> = computed(() =>
  props.columns.length
    ? // Inject column defaults by iterating over each col
    props.columns.map((c) => ({ ...columnDefaults, ...c }))
    : // Else generate columns from first row
    isSST.value
      ? rowsToRender.value.length
        ? Object.keys(rowsToRender.value[0])
          .map((k) => ({
            ...columnDefaults,
            name: k,
            title: k
          }))
        : []
      : props.rows?.length
        ? Object.keys((props.rows as Object[])[0]).map((k) => ({
          ...columnDefaults,
          name: k,
          title: k
        }))
        : []
)

const fetchRows = () => {
  ; (props.rows as ItemsFunction)({
    q: _search,
    currentPage: currentPage.value,
    rowsPerPage: currentPageSize,
    sortedCols: toRaw(sortedCols.value)
  }).then((data) => {
    const { rows, total } = data
    _serverRows = rows as Object[]
    _serverTotal = total
  })
}
// Filter out columns that is searchable based on isFilterable property
const searchableCols = _columns.value.filter(
  (col) => col.isFilterable || col.filterBy
)

// 👉 sortedCols
const sortedCols = ref<TableColumn[]>([])

// 👉 Filtered Rows
let { results: filteredRows } = useSearch(
  _search,

  _rows as ComputedRef<Object[]>,
  searchableCols.map((col) => {
    return col.filterBy ? { name: col.name, filterBy: col.filterBy } : col.name
  })
)

let { results: sortedRows } = useSort(
  filteredRows,
  computed(() => {
    const colsSortBy: typeSortBy = []
    sortedCols.value.forEach((col) => {
      if (col.sortBy) colsSortBy.push({ name: col.name, sortBy: col.sortBy })
      else if (col.shallSortByAsc !== null)
        colsSortBy.push({ name: col.name, isAsc: col.shallSortByAsc })
    })
    return colsSortBy
  })
)
const computeValue = () => {
  // getPage()
  const { results: tempSearch } = useSearch(
    _search,

    // TODO(TS): Improve typing
    _rows as ComputedRef<Object[]>,
    searchableCols.map((col) => {
      return col.filterBy
        ? { name: col.name, filterBy: col.filterBy }
        : col.name
    })
  )
  filteredRows = tempSearch
  const { results: tempSort } = useSort(
    filteredRows,
    computed(() => {
      const colsSortBy: typeSortBy = []
      sortedCols.value.forEach((col) => {
        if (col.sortBy) colsSortBy.push({ name: col.name, sortBy: col.sortBy })
        else if (col.shallSortByAsc !== null)
          colsSortBy.push({ name: col.name, isAsc: col.shallSortByAsc })
      })
      return colsSortBy
    })
  )
  sortedRows = tempSort
  recalculateCurrentPageData()
  rowsToRender = computed(() => (isSST.value ? _serverRows : paginatedRows))
}

// 👉 Paginated Rows
let paginatedRows = $ref(sortedRows.value)

const total = computed(() =>
  isSST.value ? _serverTotal : sortedRows.value.length
)

let currentPageSize = $ref(props.pageSize)

// 👉 useOffsetPagination
let {
  currentPage,
  isFirstPage,
  isLastPage,
  prev: goToPreviousPage,
  next: goToNextPage
} = useOffsetPagination({
  total,
  page: 1,
  pageSize: currentPageSize,

  onPageChange: () => {
    recalculateCurrentPageData()
  },
  onPageSizeChange: () => {
    recalculateCurrentPageData()
  }
})
const paginateRows = ({
  currentPage,
  currentPageSize
}: {
  currentPage: number
  currentPageSize: number
}) => {
  const start = (currentPage - 1) * currentPageSize
  const end = currentPage * currentPageSize
  setTimeout(() => {
    paginatedRows = sortedRows.value.slice(start, end)
  }, 100)
}

// 👉 rowsToRender
let rowsToRender = computed(() => (isSST.value ? _serverRows : paginatedRows))

const recalculateCurrentPageData = () => {
  // getPage()
  if (isSST.value) fetchRows()
  else
    paginateRows({
      currentPage: currentPage.value,
      currentPageSize: currentPageSize
    })
}

watch([_search, sortedCols], recalculateCurrentPageData, {
  deep: true,
  immediate: true
})
watchEffect(() => {
  computeValue()
})

// 👉 Handle header click
const handleHeaderClick = (col: TableColumn) => {
  // If table is not sortable don't sort the table
  if (!props.isSortable) return

  const index = sortedCols.value.findIndex((c) => c.name === col.name)

  if (index > -1) {
    // Sorted by Asc
    if (col.shallSortByAsc) {
      col.shallSortByAsc = false
    }

    // Sorted by Desc
    else {
      col.shallSortByAsc = null
      sortedCols.value.splice(index, 1)
    }
  }

  // Not sorted
  else {
    col.shallSortByAsc = true
  }

  // Handle Multi sort
  if (col.shallSortByAsc !== null) {
    if (!props.multiSort) sortedCols.value = [col]
    else if (col.shallSortByAsc) sortedCols.value.push(col)
    else sortedCols.value.splice(index, 1, { ...col })
  }
}

const getShallSortByAsc = computed(() => (col: TableColumn) => {
  const _col = sortedCols.value.find((sortedCol) => sortedCol.name === col.name)

  return !_col ? null : _col?.shallSortByAsc
})
const updatePagination = (value: any) => {
  currentPageSize = value
  computeValue()
}
const next = () => {
  goToNextPage()
}
onMounted(() => {
  currentPageSize = props.pageSize
  computeValue()
})
</script>

<template>
  <div class="background-secondary m-10 shadow-btn dark:shadow-btn-dark text-sm p-4 rounded-lg">
    <div class="w-full flex justify-end items-end">
      <div class="search" v-if="search">
        <div class="icon" i-carbon:search />
        <input id="search" type="text" class="input" v-model="_search" placeholder="Search" />
      </div>
    </div>
    <div class="overflow-x-auto">
      <!-- 👉 table -->
      <table class="table overflow-x-auto w-full max-w-full text-color-primary">
        <!-- 👉 thead -->
        <thead>
          <tr>
            <th v-for="(column, idx) of _columns" :key="idx" :class="[
              'table-header whitespace-nowrap',
              props.isSortable && 'cursor-pointer select-none',
              column?.width
            ]" @click="handleHeaderClick(column)">
              <div class="" :class="
                idx === _columns.length - 1 ? 'text-center' : 'text-left'
              ">
                <span>{{ column.name }}</span>
                <div v-show="getShallSortByAsc(column) === true" class="i-bx-up-arrow-alt"></div>
                <div v-show="getShallSortByAsc(column) === false" class="i-bx-down-arrow-alt"></div>
              </div>
            </th>
          </tr>
        </thead>
        <!-- 👉 tbody -->
        <tbody v-if="rowsToRender.length">
          <tr v-for="(row, idx) of rowsToRender" :key="idx">
            <td v-for="(col, id) of _columns" :key="id" class="table-item whitespace-nowrap truncate" :class="col?.width">
              <slot :name="`row-${col.name}`" :value="row[col.name as keyof Object]" :record="row"
                v-bind="{ row, idx }">
                <div class="truncate" v-if="col.name === 'index'">
                  {{ idx + 1 }}
                </div>
                <div v-else class="truncate">
                  {{ row[col.name as keyof Object] }}
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="_columns.length" class="em:px-[1.15rem] em:h-14 whitespace-nowrap text-center font-medium">
              {{ noResultsText }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 👉 footer -->
      <div class="footer">
        <ATypography class="text-size-[inherit]" :subtitle="[
          `${rowsToRender.length ? (currentPage - 1) * currentPageSize + 1 : 0
          } - ${(isLastPage || (total < currentPageSize)) ? rowsToRender.length : currentPage * currentPageSize
          } of ${total}`
        ]"></ATypography>
        <div class="flex-grow"></div>
        <div class="footer-page-container">
          <span class="sm:inline hidden">per page</span>
          <Dropdown id="table-page-select" @update:model-value="updatePagination($event)" v-model="currentPageSize"
            :options="[5, 10, 15, 20]" :get-label="(option) => option" :get-value="(option) => option"
            name="table-page-select" />
        </div>
        <div>
          <ABtn icon-only class="footer-previous-btn" icon="i-bx-left-arrow-alt" variant="default"
            @click="currentPage--; goToPreviousPage()" :disabled="isFirstPage">
          </ABtn>
          <ABtn icon-only class="footer-next-btn" icon="i-bx-right-arrow-alt" variant="default" @click="next()"
            :disabled="isLastPage || (total <= currentPageSize)"></ABtn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.search {
  @apply relative mb-4 text-xs;
}

.search .icon {
  @apply w-4 absolute left-3 top-3;
}

.search .input {
  @apply w-60 bg-transparent p-3 rounded-lg pl-8;
  @apply truncate focus: outline-none;
  @apply border border-primary/20 dark: border-secondary/30 focus:border-primary dark:focus:border-secondary;
}

.table tr {
  @apply border-b border-primary/20 dark: border-secondary/30;
}

.table-header {
  @apply h-12 px-4 text-sm text-center capitalize;
}

.table-item {
  @apply px-4;
  height: 3.5em;
}

.footer {
  @apply flex items-center mt-2;
  height: 3.5em;
  grid-column-gap: 1rem;
  column-gap: 1rem;
  padding-left: 1.15em;
  padding-right: 1.15em;
}

.footer-page-container {
  @apply flex items-center;
  grid-column-gap: 0.5rem;
  column-gap: 0.5rem;
  font-size: 0.875em;
  line-height: 1.25em;
}

.footer-page-select {
  width: 4rem;
  min-width: auto;
  font-size: 0.75rem;
  line-height: 1rem;
}

.footer-page-select-list {
  --un-bg-opacity: 1 !important;
  background-color: rgba(248, 250, 252, var(--un-bg-opacity)) !important;
  font-size: 0.75rem;
  line-height: 1rem;
}

.footer-previous-btn {
  margin-inline-end: 0.5rem;
  border-radius: 9999px !important;
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

.footer-next-btn {
  border-radius: 9999px !important;
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}
</style>
