<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import type { IpfsDocs } from '~/graphql'
defineProps<IFileProps>()
const emit = defineEmits<IFileEmits>()
const { gridView } = $(storeToRefs(useFileStore()))
interface IFileEmits {
  (e: 'open:file', value: IpfsDocs): void
  (e: 'select:file', value: IpfsDocs): void
}
interface IPosition {
  x: 'left' | 'right'
  y: 'top' | 'bottom'
}
interface IFileProps {
  item: IpfsDocs
  selected?: boolean
  position?: IPosition
}
let isRightClick = $ref(false)
let showFile = $ref(false)
const onRightClick = (item: any) => {
  isRightClick = true
}
const dropdown = ref<HTMLDivElement>()
let currentFile = $ref<IpfsDocs>()
onClickOutside(dropdown, (event) => {
  isRightClick = false
})
const RIGHTCLICK_OPTIONS = [
  'Open',
  'Select',
  'Move',
  'Copy',
  'Download',
  'Share',
  'Delete',
]
// const currentFile = $ref<IFile>()
const openFile = (item: IpfsDocs) => {
  emit('open:file', item)
  // console.log('🚀 ~ file: File.vue ~ line 29 ~ openFile ~ item', item)
  currentFile = item
  showFile = true
}
const selectFile = (item: IpfsDocs) => {
  console.log('🚀 ~ file: Folder.vue ~ line 40 ~ selectFolder ~ item', item)
  emit('select:file', item)
}
const selectOption = (item: string) => {
  console.log('🚀 ~ file: File.vue ~ line 49 ~ selectOption ~ item', item)
  isRightClick = false
}
</script>

<template>
  <button
    class="flex"
    :class="
      gridView
        ? 'flex-col justify-center items-center gap-[0.188rem]'
        : 'flex-row space-x-4 justify-start items-center text-left'
    "
    @contextmenu.prevent="onRightClick(item)"
    @dblclick="openFile(item)"
    @click="selectFile(item)"
  >
    <!-- @contextmenu.prevent="onRightClick(item)" -->

    <div
      class="border-2 px-1 border-gray-300 rounded-lg"
      :class="[
        item.dataType === 'IMAGE' ? ' bg-white py-2' : 'bg-sky-300',
        gridView ? 'grid-file-icon-hover w-16 h-16' : 'w-12 h-12 border-0',
        selected && gridView ? 'grid-file-icon-selected ' : '',
      ]"
    >
      <FMSThumbnail :url="item.thumbHash" :type="item.dataType" />
      <!-- <img
        :src="item.src"
        alt="file"
        class="h-full object-contain m-auto"
      /> -->
      <!-- <img
        v-if="grid === false"
        :src="item.src"
        alt="file"
        class="h-full object-contain m-auto"
      /> -->
    </div>
    <p class="text-color-primary flex flex-col">
      <span
        class="text-xs"
        :class="[
          gridView ? 'font-medium px-[4px] py-[2px]' : 'font-bold',
          selected && gridView ? 'grid-file-name-selected ' : '',
        ]"
      >{{ item.name }}</span>
      <span v-if="gridView === false" class="text-[12px] p-1 font-semibold">{{
        item.updatedAt
      }}</span>
    </p>
    <!-- <p class="justify-center text-black text-sm flex flex-col" :class="grid ? 'absolute h-8 font-light text-xs bg-gray-100 bottom-0 w-full rounded-md border border-gray-300 ' : 'font-semibold ml-4'">
        {{ item.name }}
        <span v-if="grid === false" class="text-xs">{{ item.last_updated }}</span>
      </p> -->
  </button>

  <Transition name="bounce-center">
    <ul
      v-if="isRightClick"
      ref="dropdown"
      tabindex="0"
      class="right-click-dropdown"
      :class="`${position?.x}-${position?.y}`"
    >
      <li
        v-for="(option, i) in RIGHTCLICK_OPTIONS"
        :key="i"
        class="right-click-dropdown-item"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </Transition>
  <!-- <CustomModal :show="showModal">
      <template #content>
        Success
      </template>
    </CustomModal> -->
  <FMSFileViewer
    :show="showFile"
    :item="currentFile"
    @close="showFile = false"
    @backdrop="showFile = false"
  />
</template>

<style scoped lang="css">
.grid-file-icon-hover {
  @apply hover:bg-primary/30 hover:dark:bg-header rounded-md;
}
.grid-file-icon-selected {
  @apply bg-primary/30 dark:bg-header rounded-md;
}
.grid-file-name-selected {
  @apply bg-primary dark:bg-header rounded-sm text-white;
}
.right-click-dropdown {
  @apply z-20 absolute w-36 text-xs;
  @apply background rounded-lg shadow-btn dark:shadow-btn-dark;
}
.right-click-dropdown-item {
  @apply px-4 py-2 flex justify-start items-center space-x-2 cursor-pointer w-full;
  @apply transition duration-200 ease-in-out;
  @apply hover:rounded-md hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover;
}
.left-top {
  @apply top-10 left-12;
}
.left-bottom {
  @apply bottom-10 left-12;
}
.right-top {
  @apply top-10 right-12;
}
.right-bottom {
  @apply bottom-10 right-12;
}
.bounce-center-enter-active {
  animation: bounce-in 0.3s;
  @apply origin-top;
}

.bounce-center-leave-active {
  animation: bounce-in 0.3s reverse;
  @apply origin-top;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
