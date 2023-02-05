import { IFolder } from "~/utils/interfaces/folder"

export const useFileStore = defineStore('file', () => {
  const currentFolderType = ref<IFolder | null>( null)
  const gridView = ref(true)
  // const selectedFolder = ref<IpfsDirectory>()
  // const selectedFile = ref<IpfsDocs>()
  const currentFolderId = ref<String>()
  const currentFolderDirectory = ref<Array<Object> >()

  const toggleGridView = async () => {
    gridView.value = !gridView.value
  }
  const updateCurrentFolder = async (folder = '') => {
    currentFolderId.value = folder
  }

  return {
    gridView,
    toggleGridView,
    currentFolderType,
    currentFolderId,
    currentFolderDirectory,
    updateCurrentFolder,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot))
