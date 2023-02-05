<script lang="ts" setup>import { IFolder } from '~/utils/interfaces/folder';

const props = defineProps<IFolderListProps>()
const emit = defineEmits<IFolderListEmit>()
const { gridView } = storeToRefs(useFileStore())
interface IFolderListProps {
  folders?: IFolder[]
  folderView?: boolean
}
interface IFolderListEmit {
  (e: 'open:folder', value: IFolder): void
  (e: 'select:folder', value: IFolder): void
}
const folderDiv = ref<HTMLDivElement>()
const target = ref<HTMLDivElement>()
</script>

<template>
  <div ref="target" class="folder-div relative">

    <div
      class="flex flex-wrap justify-between md:justify-start"
      :class="gridView ? 'flex-row gap-4 md:gap-16 gap-y-8' : 'flex-col justify-start gap-6'"
    >
      <div
        v-for="(folder, i) in folders" ref="folderDiv" :key="i" class="relative px-2 cursor-pointer"
        :class="[gridView ? '' : 'grid-folder-icon-hover ']"
      >
        <FMSFolder :item="folder" @select:folder="emit('open:folder', $event)" />
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
