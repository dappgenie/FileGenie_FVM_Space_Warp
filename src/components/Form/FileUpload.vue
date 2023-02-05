<script lang="ts" setup>import { createBlobFromAsset } from '~/utils/functions/web3';

interface IFileUploadEmit {
  (e: 'update', value: any): string
}
const emit = defineEmits<IFileUploadEmit>()
const image = ref<Blob | null>(null);
const imagePreview = ref('')
const onFileChange = async(e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files || (e as any).dataTransfer.files;
  if (!files.length) return;
  createImage(files[0]);
};

const createImage = (file: File) => {
  // let image = '';
  const reader = new FileReader();

  reader.onload = async (e: ProgressEvent<FileReader>) => {
    const data = (e.target as FileReader).result as string;
    image.value = await createBlobFromAsset(data)
    imagePreview.value = data
    console.log("🚀 ~ file: FileUpload.vue:20 ~ createImage ~ image.value", image.value)
    emit('update', image.value);
  };
  reader.readAsDataURL(file);
};

</script>

<template>
  <div class="contain">
    <div class="upload-container">
      <div class="preview-container" v-if="image">
        <img :src="imagePreview" h-full @click="onFileChange" />
      </div>
      <input v-else class="w-full h-full z-30 absolute" type="file" @change="onFileChange">
    </div>
  </div>
</template>

<style scoped lang="css">

.contain {
  @apply w-full h-28 mt-2 flex flex-col items-center justify-center;
}

.upload-container {
  @apply relative flex items-center justify-center cursor-pointer;
  @apply w-full h-28 border-2 border-color border-dashed rounded-md;
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
  @apply w-auto h-28 overflow-hidden;
}

img {
  width: 100%;
}
</style>
