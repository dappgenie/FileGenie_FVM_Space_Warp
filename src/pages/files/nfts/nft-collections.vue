<script lang="ts" setup>
import { INFTCollection } from '~/utils/interfaces/NFT';

const showUploadNFT = ref<boolean>(false)
const data = ref<INFTCollection>({
  name: '',
  nfts: [
    {
      name: '',
      description: '',
      image: '',
    },
  ],
})
</script>

<template>
  <SubHeader>
    <template #content>
      <Button m-auto :rounded="'lg'">
        <template #content>
          Upload NFT Collection
        </template>
      </Button>
    </template>
  </SubHeader>
  <!-- <ModalCustom :show="!showUploadNFT">
    <template #title>
      <div p-6 text-lg font-black>Add NFT Data</div>
    </template>
    <template #content>
      <div class="px-10 w-[600px]">
        <div flex gap-x-2>
          <FormTextInput
            v-model="data.name"
            class="text-sm my-3" label="Collection Name"
            placeholder="Enter collection name"
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
          <FormFileUpload @upload="data.image = $event"/>
        </div>
       <div></div> -->
  <Button :rounded="'lg'" mt-6>
    <template #content>
      Add Attribute
    </template>
  </Button>
  <Button :rounded="'lg'" mt-6>
    <template #content>
      Add Attribute
    </template>
  </Button>
  <!-- </div> -->
  <!-- </template> -->
  <!-- </ModalCustom>  -->
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
