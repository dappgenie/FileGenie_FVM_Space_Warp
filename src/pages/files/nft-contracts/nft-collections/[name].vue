<script lang="ts" setup>import { Web3Service } from '~/services/web3';
import { readFile } from '~/utils/functions/web3';

const { files, open, reset } = useFileDialog()
interface IContract {
  name: string
  type: string
}
const route = useRoute()
const web3Service = new Web3Service()
const name = ref<string>((route.params.name as string) || '')
const showInstructions = ref<boolean>(false)

let filesList = ref<IContract[]>([])
const filesDataList = ref<File[]>([])
const metaDataFile = computed(() => {
  if(!files.value) return null
  return files.value[0]
})
const metaDataJson = ref<any>(null)
function onDrop(filesData: File[] | null) {
  console.log("🚀 ~ file: [name].vue:9 ~ onDrop ~ filesData", filesData)
  if(!filesData) return
  filesDataList.value = filesData
  filesList.value = filesData.map((file) => {
    return {
      name: file.name,
      type: file.type,
      size: ((file.size/1024) > 1024) ? `${((file.size/1024)/1024).toFixed(2)} MB` : `${(file.size/1024).toFixed(2)} KB`,
    }
  })
  console.log("🚀 ~ file: [name].vue:25 ~ filesList=files.map ~ filesList", filesList)
}

const readFile = async(file: File) => {
  const reader = new FileReader();
  reader.onload = async (event) => {
    metaDataJson.value =  await JSON.parse(event.target?.result as string);
  };
  reader.readAsText(file);
};

const upload = async() => {
  if(!files.value) return
  if(metaDataJson.value) {
    console.log("🚀 ~ file: [name].vue:43 ~ upload ~ metaDataJson.value", metaDataJson.value)
    web3Service.uploadNFTCollection(filesDataList.value, metaDataJson.value)
  }
  
}
// const data = ref<INFTCollection>({
//   name: (route.params.name as string) || '',
//   nfts: [
//     {
//       name: '',
//       description: '',
//       image: null,
//       attributes: []
//     },
//   ],
// })
onMounted(() => {
  showInstructions.value = true;
  console.log('mounted', name.value)
})
watch(metaDataFile, async(val) => {
  console.log("🚀 ~ file: [name].vue:67 ~ watch ~ val", val)
  await readFile(val as File)
})
const colData = [
  { name: 'index', title: 'Index', width: 'w-[10%]' },
  { name: 'name', title: 'File Name', width: 'w-[25%]' },
  { name: 'type', title: 'Type', width: 'w-[25%]' },
  { name: 'size', title: 'Size', width: 'w-[20%]' },
  { name: 'action', title: 'Action', width: 'w-[25%]' }
]
const removeFile = (index: number) => {
  filesList.value.splice(index, 1)
}
</script>

<template>
  <div w-full flex gap-x-2 mt-10 px-24 justify-end  >
    <Button v-if="files" :rounded="'lg'" @click="upload()">
          <template #content>
            Upload collection
          </template>
        </Button>

    <Button v-else :rounded="'lg'" @click="open()">
          <template #content>
            Add Metadata
          </template>
        </Button>
  </div>
  <Table
    v-if="filesList.length"
    :rows="filesList"
    :columns="colData"
    :search="true"
    :noResultsText="'No matching results found!!'"
    :isSortable="true"
    :multiSort="false"
    :pageSize="5"
  >
    <template #row-action="{record, idx}">
      <div class="flex items-center justify-center">
        <ABtn
          @click="removeFile(idx)"
          class="text-xs color_dark"
          icon="i-bx-trash"
          icon-only
          variant="text"
        />
      </div>
    </template>
  </Table>
  <FormDropzone @on-drop="onDrop($event)" v-else/>
  <!-- <div v-else class="dropzone" ref="dropZoneRef">
    <div m-auto text-center>
      <div w-24 h-24 i-mdi:image/>
      <div>Click or Drop files here</div>
    </div>
  </div> -->

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
</style>

<route lang="yaml">
  meta:
    layout: dashboard
  </route>
