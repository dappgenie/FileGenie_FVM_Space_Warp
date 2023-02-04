<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import type { FileTypes } from '@dappgenie/utils'
import folderImage from '../../assets/images/files/folder.svg'
import type { IpfsDirectory } from '~/graphql'
defineProps<IFolderProps>()
const emit = defineEmits<IFolderEmit>()
const { updatecurrentFolderType } = useFileStore()
const { gridView } = $(storeToRefs(useFileStore()))
interface IFolderEmit {
  (e: 'open:folder', value: IpfsDirectory): void
  (e: 'select:folder', value: IpfsDirectory): void
}
interface IFolderProps {
  item: IpfsDirectory
  selected?: boolean
}
const router = useRouter()
let isRightClick = $ref(false)
const onRightClick = (item: any) => {
  isRightClick = true
}
const dropdown = ref<HTMLDivElement>()
onClickOutside(
  dropdown,
  (event) => {
    isRightClick = false
  },
)
const RIGHTCLICK_OPTIONS = [
  'Open',
  'Rename',
  'Select',
  'Move',
  'Copy',
  'Download',
  'Share',
  'Delete',
]
const openFolder = (item: IpfsDirectory) => {
  console.log('🚀 ~ file: Folder.vue ~ line 40 ~ openFolder ~ item', item)
  emit('open:folder', item)
  updatecurrentFolderType(item.fileType as unknown as FileTypes)
  router.push(`/file-manager/${encodeURIComponent(item._id)}`)
}
const selectFolder = (item: IpfsDirectory) => {
  emit('select:folder', item)
}
</script>

<template>
  <button
    class="flex"
    :class="gridView ? ' flex-col justify-center items-center gap-[0.188rem]' : 'flex-row space-x-4 justify-start items-center text-left'"
    @contextmenu.prevent="onRightClick(item)" @dblclick="openFolder(item)" @click="selectFolder(item)"
  >
    <div class="px-1 py-2" :class="[gridView ? 'grid-folder-icon-hover' : '', (selected && gridView) ? 'grid-folder-icon-selected ' : '']">
      <img v-if="gridView === true" :src="folderImage" alt="folder" class="h-12">
      <img v-if="gridView === false" :src="folderImage" alt="folder" class="h-10">
    </div>
    <p class="text-color-primary flex flex-col">
      <span class="text-xs" :class="[gridView ? 'font-medium px-[4px] py-[2px]' : 'font-bold', (selected && gridView) ? 'grid-folder-name-selected ' : '']">{{ item.name }}</span>
      <!-- <span v-if="grid === false" class="text-[12px] p-1 font-semibold">{{ item.contents.files.length + item.contents.folders.length }} item, {{ item.last_updated }}</span> -->
    </p>
  </button>
  <ul v-if="isRightClick" ref="dropdown" tabindex="0" class="right-click-dropdown">
    <li v-for="(option, i) in RIGHTCLICK_OPTIONS" :key="i" class="right-click-dropdown-item">
      {{ option }}
    </li>
  </ul>
</template>

<style scoped lang="css">
.grid-folder-icon-hover {
    @apply hover:bg-primary/30 hover:dark:bg-header rounded-md;
}
.grid-folder-icon-selected {
    @apply bg-primary/30 dark:bg-header rounded-md;
}
.grid-folder-name-selected {
    @apply bg-primary dark:bg-header rounded-sm text-white;
}
.right-click-dropdown {
  @apply z-20 absolute top-10 left-12 w-36 text-xs;
  @apply background rounded-lg shadow-btn dark:shadow-btn-dark;
}
    .right-click-dropdown-item {
      @apply px-4 py-2 flex justify-start items-center space-x-2 cursor-pointer w-full;
      @apply transition duration-200 ease-in-out;
      @apply hover:rounded-md hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover
    }
</style>
