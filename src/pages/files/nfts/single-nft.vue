<script lang="ts" setup>
import { Web3Service } from '~/services/web3';
import { supabase } from '~/utils/functions/supabase';
import { INFTStructure, ISingleNFT } from '~/utils/interfaces/NFT';
const { address } = storeToRefs(useWeb3Store())
const { connectWallet } = useWeb3Store()
const web3Service = new Web3Service()
const showUploadNFT = ref<boolean>(false)
const isSuccess = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const fileList = ref<ISingleNFT[]>([])
// const cid = 'bafyreidyywjpslozsjpw7lzgptamrajjihmr4h6w5d33pugrayk2k4q4c4/metadata.json'
let data = reactive<INFTStructure>({
  name: '',
  description: '',
  image: null,
  attributes: []
})
const addAttribute = () => {
  if (!data.attributes) data.attributes = []
  data.attributes.push({
    display_type: 'property',
    trait_type: '',
    value: ''
  })
  console.log(data)
}
const removeAttribute = (index: number) => {
  if (data.attributes)
    data.attributes.splice(index, 1)
}
const uploadImage = async () => {
  await connectWallet()
  console.log("🚀 ~ file: single-nft.vue:20 ~ uploadImage ~ data", data)
  isLoading.value = true
    showUploadNFT.value = false
  const res = await web3Service.uploadNFT(data)
  await supabase
    .from('ipfs_single_nft')
    .insert({ name: data.name, cid: res?.cid, uri: res?.uri, user_wallet: address.value })
  if (res) {
  isLoading.value = false
    isSuccess.value = true
  }
}
const colData = [
  { name: 'index', title: 'Index', width: 'w-[20%]' },
  { name: 'name', title: 'File Name', width: 'w-[30%]' },
  { name: 'cid', title: 'CID', width: 'w-[30%]' },
  { name: 'action', title: 'Action', width: 'w-[20%]' }
]
const mountFetch= async()=>{
  const { data, error } = await supabase
  .from('ipfs_single_nft')
  .select()
  .eq('user_wallet', address.value)
  if(data) fileList.value = data
  console.table(data)
  console.log(error)
}
const getUri = async(uri: string) => {
  const response = await fetch(uri)
  if(response.status === 200) {
    const data = await response.json()
    const cid = data.image.replace('ipfs://', '');
    const uri = `https://ipfs.io/ipfs/${cid}`
    window.open(uri, '_blank')
  }
  return ''
}
onMounted(() => {
  mountFetch()
})
</script>

<template>
  <SubHeader>
    <template #content>
      <Button m-auto :rounded="'lg'" @click="showUploadNFT = true">
        <template #content>
          Upload NFT
        </template>
      </Button>
    </template>
  </SubHeader>
  <div>
  <Table
    v-if="fileList.length"
    :rows="fileList"
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
          @click="getUri(record.uri)"
          class="text-xs color_dark"
          icon="i-bx:window-open"
          icon-only
          variant="text"
        />
      </div>
    </template>
  </Table>
  <LoaderPreloader v-if="isLoading"/>
  </div>

  <ModalCustom :show="showUploadNFT" @close="showUploadNFT = false">
    <template #title>
      <div p-6 text-lg font-black>Add NFT Data</div>
    </template>
    <template #content>
      <div class="px-10 w-[600px]">
        <div flex gap-x-2>
          <FormTextInput v-model="data.name" class="text-sm my-3" label="NFT Name" placeholder="Enter NFT name" />
        </div>
        <div flex gap-x-2>
          <FormTextArea v-model="data.description" class="text-sm my-3" label="Description"
            placeholder="Enter description" />
        </div>
        <div flex gap-x-2>
          <FormFileUpload @update="data.image = $event" />
        </div>
        <div v-for="(attribute, id) of data.attributes" w-full flex justify-between items-center gap-x-2 my-6>
          <FormSelect v-model="attribute.display_type" :input-option-class="'w-[33%]'" label="Display Type"
            placeholder="Display Type" :options="['property', 'number', 'boost_number', 'boost_percentage']"
            :get-label="(option) => option" :get-value="(option) => option" :input-type="'inputCustom'"
            @update:model-value="attribute.display_type = $event" />
          <FormTextInput v-model="attribute.trait_type" class="text-sm w-[33%]" label="Attribute Name"
            placeholder="Enter attribute name" />
          <FormTextInput v-model="attribute.value" class="text-sm w-[33%]" label="Attribute Value"
            placeholder="Enter attribute value" />
          <Button :color="'warning'" :rounded="'lg'" @click="removeAttribute(id)">
            <template #content>
              <div i-mdi:delete-outline />
            </template>
          </Button>
        </div>
        <Button :rounded="'lg'" mt-6 @click="addAttribute()">
          <template #content>
            Add Attribute
          </template>
        </Button>
        <Button :color="'gradient'" :rounded="'lg'" mt-6 w-full @click="uploadImage()">
          <template #content>
            <div py-1> Upload NFT </div>
          </template>
        </Button>
      </div>
    </template>
  </ModalCustom>

</template>

<style scoped lang="css">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.input-file {
  display: none;
}

label {
  font-size: 16px;
  font-weight: bold;
  color: #999;
}

.preview-container {
  width: 200px;
  height: 200px;
  overflow: hidden;
}

img {
  width: 100%;
}
</style>

<route lang="yaml">
  meta:
    layout: dashboard
  </route>
