<script lang="ts" setup>
const router = useRouter()
const showUploadNFT = ref<boolean>(false)
const name = ref<string>('')
const go = () => {
  if('name')
    router.push(`/files/nft-contracts/nft-collections/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <SubHeader>
    <template #content>
      <Button m-auto :rounded="'lg'" @click="showUploadNFT=true">
        <template #content>
          Upload NFT Collection
        </template>
      </Button>
    </template>
  </SubHeader>
  <ModalCustom :show="showUploadNFT" @close="showUploadNFT=false">
    <template #title>
      <div p-6 text-lg font-black>Add NFT Collection</div>
    </template>
    <template #content>
      <div class="px-10 w-[600px]">
        <div flex gap-x-2>
          <FormTextInput
            v-model="name"
            class="text-sm my-3" label="Collection Name"
            placeholder="Enter collection name"
          />
        </div>
        <Button :rounded="'lg'" mt-3 mx-auto @click="go()">
          <template #content>
            Add Collection
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
