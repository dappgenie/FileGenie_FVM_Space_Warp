<script lang="ts" setup>
import { IFolder } from '~/utils/interfaces/folder';

const foldersList: IFolder[] = [
{
  name: 'Single NFT Uploads',
  path: '/files/nfts/single-nft',
  id: '1',
  parent: null, 
  children: [],
  files: []
},
{
  name: 'NFT Collections',
  path: '/files/nfts/nft-collections',
  id: '2',
  parent: null,
  children: [],
  files: []
}]
</script>

<template>
  <SubHeader>
  </SubHeader>
  <div px-4>
    <FMSFolderList
      v-if="foldersList"
      :folders="foldersList"
    />
  </div>
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
