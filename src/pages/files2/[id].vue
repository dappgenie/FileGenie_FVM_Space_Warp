<script lang="ts" setup>
import { useFileDialog } from '@vueuse/core'
import { FileService } from '~/services/file'
import type { IpfsData, IpfsDirectory, IpfsDocs } from '~/graphql'
const props = defineProps<IFolderProps>()
const { toggleLoading } = useLoaderStore()
const { addToast } = useToastStore()
interface IFolderProps {
  id: string
}

const { files } = useFileDialog()
const { updateCurrentFolder,updatecurrentFolderDirectory } = useFileStore()

const filesData = ref<{ name: string; size: number; type: string; lastModified: number }[]>([])
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
const selectedFile = ref<IpfsDocs[]>([])

const fileService = new FileService()
const fileList = ref<IpfsData>()
async function initial(folderId: string) {
  toggleLoading()
  updateCurrentFolder(folderId);
  fileList.value = await fileService.query().getAllDetailsBasedFolderId(folderId) as IpfsData
  // console.log("🚀 ~ file: [id].vue ~ line 41 ~ initial ~ fileList", fileList)
  updatecurrentFolderDirectory(fileList.value.directory)

  toggleLoading()
  addToast(`${fileList.value.location.name} Loaded`, 'success')
}
onMounted(() => {
  initial(props.id)
})
whenever(files, () => { })
</script>

<template>
  <FMSSubheader
    :search="searchValue"
    :show-info="showInfo"
    :root="false"
    :path="[{ name: fileList?.location ? fileList!.location.name : '', url: '' }, { name: fileList?.location ? fileList!.location.name : '', url: '' }, { name: fileList?.location ? fileList!.location.name : '', url: '' }, { name: fileList?.location ? fileList!.location.name : '', url: '' }, { name: fileList?.location ? fileList!.location.name : '', url: '' }] "
    @input:search="searchValue = $event"
    @click:info="showInfo = $event"
  />

  <div class="fms-content" :class="isOverDropZone ? 'folder-div-outline' : ''">
    <div ref="dropZoneRef" class="px-4 md:px-10" :class="showInfo ? 'w-[70%] lg:w-[75%]' : 'w-full'">
      <FMSFolderList
        v-if="fileList?.directory"
        :folders="fileList?.directory"
        @select:folder="selectedFolder = $event"
      />
      <FMSFileList
        v-if="fileList?.docs"
        :files="fileList?.docs"
        @select:file="selectedFile = $event; selectedFolder = []"
      />
    </div>
    <FMSInfo
      :show-info="showInfo"
      :items="selectedFolder ? selectedFolder : selectedFile"
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

.fms-dropdown-content {
  @apply space-y-1 text-xs;
}

.dropdown-item {
  @apply px-4 py-2 flex justify-start items-center space-x-2 cursor-pointer w-full;
  @apply transition duration-200 ease-in-out;
  @apply hover: rounded-md hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover;
}

.dropdown-item-text {
  @apply text-color-secondary text-gray-800 dark:text-gray-100;
}

.dropdown-item-icon {
  @apply text-md text-color-secondary transition duration-200 ease-in-out;
  @apply fill-gray-600 dark:fill-gray-300;
}

.search {
  @apply flex justify-start items-center space-x-2;
}

.search .icon {
  @apply w-4 m-auto text-white;
}

.search .input {
  @apply w-42 bg-transparent text-xs border-b border-gray-300;
  @apply text-white p-1 truncate focus: outline-none;
}

.search .input::placeholder {
  @apply text-white;
}

.fms-btn {
  @apply btn hover: scale-105 hover:dark:bg-gray-400/90 hover:bg-gray-200 w-4 text-white font-bold;
}

.fms-dropdown-btn {
  @apply btn flex text-xs justify-start items-center rounded-[23px] hover: bg-[#8A99B7] hover:dark:bg-[#3C4860] text-white font-bold;
}
</style>

<route lang="yaml">
meta:
  layout: dashboard
  auth: true
</route>
