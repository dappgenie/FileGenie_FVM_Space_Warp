<script lang="ts" setup>import { supabase } from '~/utils/functions/supabase';
import { IFolder } from '~/utils/interfaces/folder';

const router = useRouter()
const { address } = storeToRefs(useWeb3Store())
const showUploadNFT = ref<boolean>(false)
const name = ref<string>('')
const foldersList = ref<IFolder[]>([])
const filesList = ref<any[]>([])
const open = (folder: IFolder) => {
  console.log("🚀 ~ file: index.vue:10 ~ open ~ folder", folder)
  const file = filesList.value.filter((item: any) => item.name === folder.name)
    localStorage.setItem('nft_collections', JSON.stringify(file[0]))
}
const go = () => {
  localStorage.setItem('nft_collections', 'null')
  if('name') {
    router.push(`/files/nfts/nft-collections/${encodeURIComponent(name.value)}`)
  }
}
const mountFetch = async () => {
  const { data, error } = await supabase
    .from('ipfs_collection_nft')
    .select()
    .eq('user_wallet', address.value)
    if(!data) return
    filesList.value = data
    data?.map((item: any) => {
      foldersList.value.push({
        name: item.name,
        path: `/files/nfts/nft-collections/${encodeURIComponent(item.name)}`,
        id: item.id,
        parent: null,
        children: [],
        files: []
      })
    })
  console.table(data)
  console.log(error)
}
onMounted(() => {
  mountFetch()
})
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
    <FMSFolderList
      v-if="foldersList"
      :folders="foldersList"
      @open:folder="open($event)"
    />
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
