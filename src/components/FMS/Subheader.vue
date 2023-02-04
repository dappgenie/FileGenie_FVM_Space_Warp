<script lang="ts" setup>
import { FileTypes } from '@dappgenie/utils'
import { IpfsDirectory } from '~/graphql'
import { FileService } from '~/services/file'
const props = defineProps<IFMSHeaderProps>()
defineEmits<IFMSHeaderEmits>()
const { gridView, currentFolderType, currentFolderId } = $(
  storeToRefs(useFileStore())
)
const {
  toggleGridView,
  updatecurrentFolderType,
  currentFolderDirectory
} = useFileStore()
const { addToast } = useToastStore()
const router = useRouter()
const fileService = new FileService()
const newFolderName = ref('')
let showModal = ref(false)
const createNewFolder = async () => {
  const dupilcateName = currentFolderDirectory?.filter(function (el: any) {
    return el.name == newFolderName
  })
  if (dupilcateName!.length > 0) addToast(`Duplicate name found !`, 'warning')
  else {
    const status = (await fileService.operation().createFolder({
      name: newFolderName.value,
      location: String(currentFolderId)
    })) as IpfsDirectory
    if (status) {
      showModal.value = false
      addToast(`Folder created successfully !`, 'success')
    }
  }
}
interface IFMSHeaderProps {
  root: boolean
  showInfo?: boolean
  search: string
  path?: {
    name: string | undefined
    url: string
  }[]
}
interface IFMSHeaderEmits {
  (e: 'click:info', value: boolean): void
  (e: 'input:search', value: string): void
}

onMounted(() => {
  if (props.root) updatecurrentFolderType(FileTypes.Any)
})
// TODO Multiple Files
const { files, open } = useFileDialog({
  multiple: false,
  accept: useFileType(currentFolderType)
})

whenever(files, async (file) => {
  const newFile = file[0]
  console.log(
    '🚀 ~ file: Subheader.vue ~ line 34 ~ whenever ~ file[0]',
    file[0]
  )
  addToast(`${newFile.name} uploading...`, 'primary')
  const image = useImageThumbnail(newFile, 200)
  console.log('🚀 ~ file: Subheader.vue ~ line 37 ~ whenever ~ image', image)
  // const renamedFile = new File([newFile], useOrganicFileName(newFile.name, currentFolderType, newFile.type), { type: newFile.type })
  // const IPFSHash = (await fileService.ipfs().set(renamedFile)).data.cid
  // console.log('🚀 ~ file: Subheader.vue ~ line 33 ~ whenever ~ cid', IPFSHash)
  // const upload = await fileService.operation().createFile({
  //   IPFSHash:cid
  // })
  addToast(`${file[0].name} successfully uploaded`, 'success')
})
</script>

<template>
  <SubHeader>
    <template #path>
      <span
        flex
        gap-2
        justify-start
        items-center
        cursor-pointer
        @click="router.push('/file-manager')"
        ><div w-4 i-bx:bxs-home />
        <span v-if="root">File Management System</span>
        <div v-else-if="path?.length" flex justify-start items-center>
          <div v-for="(item, idx) in path" :key="idx" cursor-pointer>
            <span
              v-if="(path.length > 2 && idx >= path.length - 2)"
              :class="idx === path.length - 2 ? 'ml-0' : 'ml-2'"
            >
              . . . / &nbsp; &nbsp;<span @click="router.push(item.url)">{{
                item.name
              }}</span>
            </span>
            <span v-if="path.length < 2" :class="idx === 0 ? '' : 'ml-2'">
              &nbsp; &nbsp;<span @click="router.push(item.url)">{{
                item.name
              }}</span>
            </span>
          </div>
        </div>
      </span>
    </template>
    <template #content>
      <div class="flex justify-between items-center space-x-3">
        <div class="search">
          <div class="icon" i-carbon:search />
          <input
            ref="input"
            :value="search"
            type="text"
            class="input"
            placeholder="Search in folder"
            @input="$emit('input:search', search)"
          />
        </div>
        <button
          v-if="gridView"
          i-carbon:grid
          class="fms-btn"
          @click="toggleGridView"
        />
        <button
          v-if="!gridView"
          i-carbon:list
          class="fms-btn"
          @click="toggleGridView"
        />
        <Dropdown
          id="file-management-add-dropdown"
          name="file-management-add-dropdown"
          :close-on-select="true"
        >
          <template #default>
            <button class="fms-dropdown-btn">
              Add<span i-bx:bxs-down-arrow class="w-2 ml-2 text-white" />
            </button>
          </template>
          <template #content>
            <div
              id="file-management-add-dropdown-content"
              name="file-management-add-dropdown-content"
              class="w-36 fms-dropdown-content"
            >
              <div
                id="user-dropdown-profile"
                name="user-dropdown-profile"
                v-bind="attributes"
                class="dropdown-item"
                @click="showModal = true"
              >
                <div class="dropdown-item-icon">
                  <div i-mdi:folder-multiple-plus />
                </div>
                <div class="dropdown-item-text">
                  New Folder
                </div>
              </div>
              <div
                v-if="!root"
                v-bind="attributes"
                class="dropdown-item"
                @click="open()"
              >
                <div class="dropdown-item-icon">
                  <div i-mdi:file-upload />
                </div>
                <div class="dropdown-item-text">
                  File upload
                </div>
              </div>
              <!-- <div v-bind="attributes" class="dropdown-item">
                <div class="dropdown-item-icon">
                  <div i-mdi:folder-upload />
                </div>
                <div class="dropdown-item-text">
                  Folder upload
                </div>
              </div> -->
            </div>
          </template>
        </Dropdown>
        <Dropdown
          id="file-management-sort-dropdown"
          name="file-management-sort-dropdown"
          :close-on-select="true"
        >
          <template #default>
            <button class="fms-dropdown-btn">
              Sort<span i-bx:bxs-down-arrow class="w-2 ml-2 text-white" />
            </button>
          </template>
          <template #content>
            <div
              id="file-management-dropdown-sort-content"
              name="file-management-dropdown-sort-content"
              class="w-32 fms-dropdown-content"
            >
              <div
                id="user-dropdown-profile"
                name="user-dropdown-profile"
                v-bind="attributes"
                class="dropdown-item"
              >
                <div class="dropdown-item-text">
                  Sort by Name
                </div>
              </div>
              <div
                id="user-dropdown-profile"
                name="user-dropdown-profile"
                v-bind="attributes"
                class="dropdown-item"
              >
                <div class="dropdown-item-text">
                  Sort by Date
                </div>
              </div>
              <div
                id="user-dropdown-profile"
                name="user-dropdown-profile"
                v-bind="attributes"
                class="dropdown-item"
              >
                <div class="dropdown-item-text">
                  Sort by Size
                </div>
              </div>
            </div>
          </template>
        </Dropdown>
        <button
          i-carbon:information-filled
          class="fms-btn"
          @click="$emit('click:info', !showInfo)"
        />
      </div>
    </template>
  </SubHeader>
  <CustomModal :show="showModal" @close="showModal = false">
    <template #content>
      <div class="mx-8 w-[21rem] mb-8">
        <FormTextInput
          class="mb-4"
          :model-value="newFolderName"
          @update:model-value="newFolderName = $event"
        >
          <template #label>
            Enter folder name
          </template>
        </FormTextInput>
        <!-- <span class="float-right text-[#757575] mb-4">= 2.35 USDT</span> -->
        <Button
          color="primary"
          class="w-full mb-2 modal-btn"
          @click="createNewFolder"
        >
          <template #content>
            Add Folder
            <AAvatar
              icon="i-bx-folder"
              color="success"
              class="text-sm"
            ></AAvatar>
          </template>
        </Button>
      </div>
    </template>
  </CustomModal>
</template>

<style scoped lang="css">
.search {
  @apply flex justify-start items-center space-x-2;
}
.search .icon {
  @apply w-4 m-auto text-white;
}
.search .input {
  @apply w-42 bg-transparent text-xs border-b border-gray-300;
  @apply text-white p-1 truncate focus:outline-none;
}
.search .input::placeholder {
  @apply text-white;
}
.fms-dropdown-content {
  @apply space-y-1 text-xs;
}
.fms-btn {
  @apply btn hover:scale-105 hover:dark:bg-gray-400/90 hover:bg-gray-200 w-4 text-white font-bold;
}
.fms-dropdown-btn {
  @apply btn flex text-xs justify-start items-center rounded-[23px] hover:bg-[#8A99B7] hover:dark:bg-[#3C4860] text-white font-bold;
}
.dropdown-item {
  @apply px-4 py-2 flex justify-start items-center space-x-2 cursor-pointer w-full;
  @apply transition duration-200 ease-in-out;
  @apply hover:rounded-md hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover;
}
.dropdown-item-text {
  @apply text-color-secondary text-gray-800 dark:text-gray-100;
}
.dropdown-item-icon {
  @apply text-md text-color-secondary transition duration-200 ease-in-out;
  @apply fill-gray-600 dark:fill-gray-300;
}
</style>
