<script lang="ts" setup>
import { Web3Service } from '~/services/web3';
import { INFTStructure } from '~/utils/interfaces/NFT';

const web3Service = new Web3Service()
const showUploadNFT = ref<boolean>(false)
const isSuccess = ref<boolean>(false)
// const cid = 'bafyreidyywjpslozsjpw7lzgptamrajjihmr4h6w5d33pugrayk2k4q4c4/metadata.json'
let data = reactive<INFTStructure>({
      name: '',
      description: '',
      image: null,
      attributes: []
})
const addAttribute = () => {
  if(!data.attributes) data.attributes = []
  data.attributes.push({
    display_type: 'property',
    trait_type: '',
    value: ''
  })
  console.log(data)
}
const removeAttribute = (index: number) => {
  if(data.attributes)
    data.attributes.splice(index, 1)
}
const uploadImage = async (image: string) => {
  console.log("🚀 ~ file: single-nft.vue:20 ~ uploadImage ~ data", data)
  const res = await web3Service.uploadNFT(data)
  if(res) {
    isSuccess.value = true
  }
}
</script>

<template>
  <SubHeader>
    <template #content>
      <Button m-auto :rounded="'lg'" @click="showUploadNFT=true">
        <template #content>
           Upload NFT
        </template>
      </Button>
    </template>
  </SubHeader>
  <ModalCustom :show="showUploadNFT" @close="showUploadNFT=false">
    <template #title>
      <div p-6 text-lg font-black>Add NFT Data</div>
    </template>
    <template #content>
      <div class="px-10 w-[600px]">
        <div flex gap-x-2>
          <FormTextInput
            v-model="data.name"
            class="text-sm my-3" label="NFT Name"
            placeholder="Enter NFT name"
          />
        </div>
        <div flex gap-x-2>
          <FormTextArea
            v-model="data.description"
            class="text-sm my-3" label="Description"
            placeholder="Enter description"
          />
        </div>
        <div flex gap-x-2>
          <FormFileUpload @update="data.image = $event"/>
        </div>
        <div v-for="(attribute, id) of data.attributes" w-full flex justify-between items-center gap-x-2 my-6>
            <FormSelect
              v-model="attribute.display_type"
              :input-option-class="'w-[33%]'"
              label="Display Type"
              placeholder="Display Type"
              :options="['property', 'number', 'boost_number', 'boost_percentage']"
              :get-label="(option) => option"
              :get-value="(option) => option"
              :input-type="'inputCustom'"
              @update:model-value="attribute.display_type = $event"
            />
            <FormTextInput
              v-model="attribute.trait_type"
              class="text-sm w-[33%]" label="Attribute Name"
              placeholder="Enter attribute name"
            />
            <FormTextInput
              v-model="attribute.value"
              class="text-sm w-[33%]" label="Attribute Value"
              placeholder="Enter attribute value"
            />
            <Button :color="'warning'" :rounded="'lg'" @click="removeAttribute(id)">
              <template #content>
                <div i-mdi:delete-outline/>
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
