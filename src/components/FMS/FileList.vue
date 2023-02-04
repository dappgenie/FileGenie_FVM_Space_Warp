<script lang="ts" setup>
import type { IpfsDocs } from '~/graphql'
defineProps<IFileListProps>()
const emit = defineEmits<IFileListEmit>()
const { gridView } = $(storeToRefs(useFileStore()))
interface IFileListProps {
  files: IpfsDocs[]
}
interface IPosition {
  x: 'left' | 'right'
  y: 'top' | 'bottom'
}
interface IFileListEmit {
  (e: 'open:file', value: IpfsDocs[]): void
  (e: 'select:file', value: IpfsDocs[]): void
}
const fileDiv = ref<HTMLDivElement>()
let selectedFile = $ref<IpfsDocs[]>([])
onClickOutside(fileDiv, (event) => {
  selectedFile = []
})
const fileList = $ref<HTMLDivElement>()
const { width, height } = useWindowSize()
const { elementX, elementY } = useMouseInElement(fileList)
const selectFile = (item: IpfsDocs) => {
  const selectedIndex = selectedFile.findIndex(a => a._id === item._id)
  if (selectedIndex === -1)
    selectedFile.push(item)
  else
    selectedFile.splice(selectedIndex, 1)
  emit('select:file', selectedFile)
}
let position = $ref<IPosition>()
watchEffect(() => {
  if (elementX.value < (width.value - 200) && elementY.value < (height.value / 2))
    position = { x: 'left', y: 'top' }
  else if (elementX.value > (width.value - 200) && elementY.value < (height.value / 2))
    position = { x: 'right', y: 'top' }
  else if (elementX.value < (width.value - 200) && elementY.value > (height.value / 2))
    position = { x: 'left', y: 'bottom' }
  else
    position = { x: 'right', y: 'bottom' }
})
</script>

<template>
  <div ref="target" class="file-div">
    <div
      class="flex flex-wrap justify-between md:justify-start"
      :class="
        gridView
          ? 'flex-row gap-4 md:gap-16 gap-y-8'
          : 'flex-col justify-start gap-6'
      "
    >
      <div
        v-for="(file, i) in files"
        ref="fileDiv"
        :key="i"
        class="relative px-2 cursor-pointer"
        :class="[
          gridView ? '' : 'grid-file-icon-hover ',
          !gridView && selectedFile.includes(file) ? 'file-selected' : '',
        ]"
      >
        <FMSFile
          ref="fileList"
          :selected="selectedFile.includes(file)"
          :item="file"
          :position="position"
          @select:file="selectFile($event)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .file-div {
    @apply px-4 my-4 py-8;
  }
  .file-div-outline {
    @apply rounded-sm bg-primary/20 dark:bg-header/40;
    @apply outline-dashed outline-primary dark:outline-secondary;
  }
.grid-file-icon-hover {
  @apply hover:bg-primary/10 hover:dark:bg-header rounded-md;
}
.file-selected {
  @apply bg-primary/30 dark:bg-header rounded-md;
}
</style>
