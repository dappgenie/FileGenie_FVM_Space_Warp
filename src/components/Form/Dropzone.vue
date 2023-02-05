<script lang="ts" setup>

interface IDropzoneEmits {
  (e: 'onDrop', value: File[] | null): void
}
const emit = defineEmits<IDropzoneEmits>()
const dropZoneRef = ref<HTMLElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
function onDrop(files: File[] | null) {
  console.log("🚀 ~ file: Dropzone.vue:9 ~ onDrop ~ files", files)
  emit('onDrop', files)
}
</script>

<template>
  <div class="dropzone" ref="dropZoneRef">
    <div m-auto text-center>
      <div w-24 h-24 i-mdi:image/>
      <div>Drop NFT files here</div>
    </div>
  </div>
</template>

<style scoped lang="css">
.dropzone {
  @apply  w-[80%] mt-20 mx-auto border border-dashed border-color rounded-lg;
  @apply  h-96 flex;
  /* height: calc(100vh - 5rem) */
}
</style>
