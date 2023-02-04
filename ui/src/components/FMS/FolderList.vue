<script lang="ts" setup>
import type { IpfsDirectory } from '~/graphql'
const props = defineProps<IFolderListProps>()
const emit = defineEmits<IFolderListEmit>()
const { gridView } = $(storeToRefs(useFileStore()))
interface IFolderListProps {
  folders?: IpfsDirectory[]
  folderView?: boolean
}
interface IFolderListEmit {
  (e: 'open:folder', value: IpfsDirectory[]): void
  (e: 'select:folder', value: IpfsDirectory[]): void
}
const folderDiv = ref<HTMLDivElement>()

let selectedFolder = $ref<IpfsDirectory[]>([])
let mouseSelectData = $ref({
  showSelection: false,
  startX: 0,
  startY: 0,
  selectionLeft: 0,
  selectionTop: 0,
  selectionWidth: 0,
  selectionHeight: 0,
})
const keys = useMagicKeys()
const Ctrl = keys.meta

onClickOutside(
  folderDiv,
  (event) => {
    if (!Ctrl.value && !mouseSelectData.showSelection)
      selectedFolder = []
  },
)
const target = $ref<HTMLDivElement>()
const mouseSelectBox = $ref<HTMLDivElement>()
const selectFolder = (item: IpfsDirectory) => {
  console.log('🚀 ~ file: FolderList.vue ~ line 39 ~ selectFolder ~ item', item)
  const selectedIndex = selectedFolder.findIndex(a => a._id === item._id)
  if (selectedIndex === -1)
    selectedFolder.push(item)
  else
    selectedFolder.splice(selectedIndex, 1)
  emit('select:folder', selectedFolder)
}

const onMouseMove = (e: MouseEvent) => {
  mouseSelectData.selectionWidth = Math.abs(mouseSelectData.startX - e.offsetX)
  mouseSelectData.selectionHeight = Math.abs(mouseSelectData.startY - e.offsetY)
  if (e.offsetX <= mouseSelectData.startX)
    mouseSelectData.selectionLeft = e.offsetX
  if (e.offsetY <= mouseSelectData.startY)
    mouseSelectData.selectionTop = e.offsetY
}
const checkElementsOverlaps = (a: HTMLDivElement, b: HTMLDivElement) => {
  const aBoundBox = useElementBounding(a)
  const bBoundBox = useElementBounding(b)

  return !(
    ((aBoundBox.top.value + aBoundBox.height.value) < (bBoundBox.top.value))
    || (aBoundBox.top.value > (bBoundBox.top.value + bBoundBox.height.value))
    || ((aBoundBox.left.value + aBoundBox.width.value) < bBoundBox.left.value)
    || (aBoundBox.left.value > (bBoundBox.left.value + bBoundBox.width.value))
  )
}
const onMouseUp = (e: MouseEvent) => {
  const width = Math.abs(mouseSelectData.startX - e.offsetX)
  const height = Math.abs(mouseSelectData.startY - e.offsetY)
  if (width < 10 && height < 10) {
    mouseSelectData = {
      showSelection: false,
      startX: 0,
      startY: 0,
      selectionLeft: 0,
      selectionTop: 0,
      selectionWidth: 0,
      selectionHeight: 0,
    }
  }
  else {
    target.removeEventListener('mousemove', onMouseMove)
    target.removeEventListener('mouseup', onMouseUp)

    const folderElements = folderDiv.value as any as HTMLDivElement[]
    folderElements.forEach((a, i) => {
      const isOverlapping = checkElementsOverlaps(a, mouseSelectBox)
      if (isOverlapping)
        selectFolder(props.folders[i])
    })
    // TO DO : need to change
    setTimeout(() => {
      mouseSelectData = {
        showSelection: false,
        startX: 0,
        startY: 0,
        selectionLeft: 0,
        selectionTop: 0,
        selectionWidth: 0,
        selectionHeight: 0,
      }
    }, 100)
  }
}
const onMouseDown = (e: MouseEvent) => {
  mouseSelectData.showSelection = true
  mouseSelectData.selectionLeft = e.offsetX
  mouseSelectData.selectionTop = e.offsetY
  mouseSelectData.startX = e.offsetX
  mouseSelectData.startY = e.offsetY
  target.addEventListener('mousemove', onMouseMove)
  target.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <div ref="target" class="folder-div relative" @mousedown="onMouseDown">
    <div
      ref="mouseSelectBox" class="mouse-select absolute"
      :class="[mouseSelectData.showSelection ? 'block' : 'hidden']"
      :style="{ top: `${mouseSelectData.selectionTop}px`, left: `${mouseSelectData.selectionLeft}px`, width: `${mouseSelectData.selectionWidth}px`, height: `${mouseSelectData.selectionHeight}px` }"
    />
    <div
      class="flex flex-wrap justify-between md:justify-start"
      :class="gridView ? 'flex-row gap-4 md:gap-16 gap-y-8' : 'flex-col justify-start gap-6'"
    >
      <div
        v-for="(folder, i) in folders" ref="folderDiv" :key="i" class="relative px-2 cursor-pointer"
        :class="[gridView ? '' : 'grid-folder-icon-hover ',
                 (!gridView && selectedFolder.includes(folder)) ? 'folder-selected' : '']"
      >
        <FMSFolder
          :selected="selectedFolder.includes(folder)" :item="folder"
          @select:folder="selectFolder($event)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.mouse-select {
  background-color: rgba(119, 119, 121, 0.479);
}

.folder-div {
  @apply px-4 my-4 py-8;
}

.folder-view {
  @apply h-full;
  height: calc(100vh - 9.5rem);
}

.folder-div-outline {
  @apply rounded-sm bg-primary/20 dark:bg-header/40;
  @apply outline-dashed outline-primary dark:outline-secondary;
}

.grid-folder-icon-hover {
  @apply hover:bg-primary/10 hover:dark:bg-header rounded-md;
}

.folder-selected {
  @apply bg-primary/30 dark:bg-header rounded-md;
}
</style>
