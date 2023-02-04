<script lang="ts" setup>
import VuePdfEmbed from 'vue-pdf-embed'
import type { IpfsDocs } from '~/graphql'
interface IPdfProps {
  file: IpfsDocs
}
interface IPdfEmits {
  (e: 'close:fullscreen'): void
}
defineProps<IPdfProps>()
const emit = defineEmits<IPdfEmits>()
const pdfViewer = ref(null)
const size = reactive(
  useElementSize(pdfViewer, { width: 0, height: 0 }, { box: 'border-box' }),
)
let isLoading = $ref(true)
const page = $ref(0)
const pageCount = $ref(1)
const pdfSource = $ref(
  'https://bafybeiawm6p4ypp5yysg5wssi2av47jkavfwtukxpm5rqpihogsk6wqmt4.ipfs.w3s.link/ipfs/bafybeiawm6p4ypp5yysg5wssi2av47jkavfwtukxpm5rqpihogsk6wqmt4/%E0%B4%AF%E0%B4%95%E0%B5%8D%E0%B4%B7%E0%B4%BF%20%28Malayattoor%20Ramakrishnan%29%20%28z-lib.org%29.pdf',
)
const showAllPages = $ref(true)
const pdfRef = $ref<HTMLDivElement>()
const handleDocumentRender = () => {
  isLoading = false
  console.log(
    '🚀 ~ file: PdfViewer.vue ~ line 19 ~ handleDocumentRender ~ pdfRef',
    pdfRef,
  )
}
const handlePasswordRequest = (callback: any, retry: any) => {
  callback(prompt(retry ? 'Enter password again' : 'Enter password'))
}
</script>

<template>
  <div class="app-header">
    <template v-if="isLoading">
      Loading...
    </template>
    <template v-else>
      <span v-if="showAllPages"> {{ pageCount }} page(s) </span>
      <span v-else>
        <button :disabled="page <= 1" @click="page--">❮</button>
        {{ page }} / {{ pageCount }}
        <button :disabled="page >= pageCount" @click="page++">❯</button>
      </span>
      <label class="right">
        <input v-model="showAllPages" type="checkbox">
        Show all pages
      </label>
      <button class="right" @click="emit('close:fullscreen')">
        <div mr-4 i-mdi:fullscreen-exit />
      </button>
    </template>
  </div>
  <div ref="pdfViewer" class="app-content resizer">
    <VuePdfEmbed
      ref="pdfRef"
      :width="size.width"
      :source="pdfSource"
      :page="page"
      @password-requested="handlePasswordRequest"
      @rendered="handleDocumentRender"
    />
  </div>
</template>

<style scoped lang="css">
.vue-pdf-embed > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}

.app-header {
  @apply z-20 sticky top-0 p-4 bg-primary dark:bg-secondary text-white;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
  /* background-color: #555; */
  /* color: #ddd; */
}

.app-content {
  @apply z-20;
}

.right {
  float: right;
}
</style>
