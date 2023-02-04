<script lang="ts" setup>
import { FileService } from '~/services/file'
import type { IpfsData, IpfsDirectory } from '~/graphql'

const { toggleLoading } = useLoaderStore()
const { updateCurrentFolder,updatecurrentFolderDirectory } = useFileStore()
const { addToast } = useToastStore()
const fileService = new FileService()
const fileList = ref<IpfsData>()
onMounted(async () => {
  toggleLoading()
  const root = await fileService.query().getRootDirectory() as IpfsDirectory
  updateCurrentFolder(root._id);
  fileList.value = await fileService.query().getAllDetailsBasedFolderId(root!._id) as IpfsData
  updatecurrentFolderDirectory(fileList.value.directory);
  toggleLoading()
  addToast('Success','Files Loaded', 'success')
})

const filesData = ref<
  { name: string; size: number; type: string; lastModified: number }[]
>([])
function onDrop(files: File[] | null) {
  filesData.value = []
  if (files) {
    filesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }))
  }
}

const showInfo = $ref(false)
const searchValue = $ref('')
const dropZoneRef = ref<HTMLElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
const selectedFolder = ref<IpfsDirectory[]>([])
</script>

<template>
  <FMSSubheader
    :search="searchValue"
    :show-info="showInfo"
    :root="true"
    @input:search="searchValue = $event"
    @click:info="showInfo = $event"
  />
  <div class="fms-content" :class="isOverDropZone ? 'folder-div-outline' : ''">
    <div
      ref="dropZoneRef"
      class="px-4 md:px-10"
      :class="showInfo ? 'w-[70%] lg:w-[75%]' : 'w-full'"
    >
      <FMSFolderList
        v-if="fileList?.directory"
        :folders="fileList?.directory"
        @select:folder="selectedFolder = $event"
      />
    </div>
    <FMSInfo
      :show-info="showInfo"
      :items="selectedFolder"
      @click:close="showInfo = false"
    />
  </div>
</template>

<style scoped lang="css">
.folder-div-outline {
  @apply bg-primary/20 dark:bg-header/40;
}
.fms-content {
  @apply flex justify-between;
  height: calc(100vh - 7.5rem);
}
</style>

<route lang="yaml">
meta:
  layout: dashboard
  auth: true
  </route>
