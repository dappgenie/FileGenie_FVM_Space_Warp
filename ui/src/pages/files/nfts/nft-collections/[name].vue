<script lang="ts" setup>
import { INFTCollection } from '~/utils/interfaces/NFT';
interface IContract {
  name: string
  type: string
}
const route = useRoute()
const name = ref<string>((route.params.name as string) || '')
const showInstructions = ref<boolean>(false)
const dropZoneRef = ref<HTMLElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

let filesList = ref<IContract[]>([])
const filesData = ref<{ name: string; size: number; type: string; lastModified: number }[]>([])
function onDrop(files: File[] | null) {
  console.log("🚀 ~ file: [name].vue:9 ~ onDrop ~ files", files)
  if(!files) return
  filesList.value = files.map((file) => {
    return {
      name: file.name,
      type: file.type,
      size: ((file.size/1024) > 1024) ? `${((file.size/1024)/1024).toFixed(2)} MB` : `${(file.size/1024).toFixed(2)} KB`,
    }
  })
  console.log("🚀 ~ file: [name].vue:25 ~ filesList=files.map ~ filesList", filesList)
}
const data = ref<INFTCollection>({
  name: (route.params.name as string) || '',
  nfts: [
    {
      name: '',
      description: '',
      image: null,
      attributes: []
    },
  ],
})
onMounted(() => {
  showInstructions.value = true;
  console.log('mounted', name.value)
})
const colData = [
  { name: 'index', title: 'Index', width: 'w-[10%]' },
  { name: 'name', title: 'File Name', width: 'w-[25%]' },
  { name: 'type', title: 'Type', width: 'w-[25%]' },
  { name: 'size', title: 'Size', width: 'w-[20%]' },
  { name: 'action', title: 'Action', width: 'w-[25%]' }
]
</script>

<template>
  <Table
    v-if="filesList.length"
    mb-24
    :rows="filesList"
    :columns="colData"
    :search="true"
    :noResultsText="'No matching results found!!'"
    :isSortable="true"
    :multiSort="false"
    :pageSize="5"
  >
    <template #row-action="{record}">
      <div class="flex items-center justify-center">
        <ABtn
          class="text-xs color_dark"
          icon="i-bx-trash"
          icon-only
          variant="text"
        />
      </div>
    </template>
  </Table>
  <div v-else class="dropzone" ref="dropZoneRef">
    Drop files here
  </div>

  <ModalCustom :show="showInstructions" @close="showInstructions=false">
    <template #title>
      <div p-6 text-lg font-black>How to upload a collection</div>
    </template>
    <template #content>
      <div class="px-10 w-[500px]">
        <ul list-circle>
          <li my-4>Drag and drop your files with the Token ID as file name.</li>
          <li my-4>Create a json file to upload the metadata of the NFTs.</li>
          <li my-4>Each data in the json must have name, description and attributes (if needed).</li>
          <li my-4>Each data in the json must be mapped to the correct Token ID as the Key.</li>
        </ul>
      </div>
    </template>
  </ModalCustom>
</template>

<style scoped lang="css">
.dropzone {
  @apply  w-full;
  height: calc(100vh - 5rem)
}
</style>

<route lang="yaml">
  meta:
    layout: dashboard
  </route>
