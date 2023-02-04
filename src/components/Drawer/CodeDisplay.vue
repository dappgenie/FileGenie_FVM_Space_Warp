<script lang="ts" setup>
import { getHighlighter } from 'shiki-es'
import { erc1155, erc20, erc721 } from '@dappgenie/wizard'
import { theme } from '~/utils/repository/Contracts'
defineProps<ICodeProps>()
const emit = defineEmits<IEmitCode>()
const { erc20Data, erc721Data, erc1155Data } = $(storeToRefs(useTokenStore()))
const { stepper } = $(storeToRefs(useStepperStore()))
interface ICodeProps {
  showCodeEditor: boolean
}
interface IEmitCode<V = any> {
  (e: 'onClick:closeModal'): void
}
const highlighter = await getHighlighter({ theme, langs: ['solidity'] })
const code = ref('')
const printedCode = ref('')
const { copy } = useClipboard()
const selectERC = () => {
  switch (stepper.selected) {
    case 'ERC20':
      code.value = erc20.print(erc20Data)
      break
    case 'ERC721':
      code.value = erc721.print(erc721Data)
      break
    case 'ERC1155':
      code.value = erc1155.print(erc1155Data)
      break
    default:
      break
  }
  printedCode.value = highlighter.codeToHtml(code.value, { lang: 'solidity' })
}
onMounted(() => {
  selectERC()
})
onBeforeUpdate(() => {
  selectERC()
})
</script>

<template>
  <Suspense>
    <div>
      <div v-if="showCodeEditor" class="overlay" @click="emit('onClick:closeModal')" />
      <div class="editor-bg" :class="showCodeEditor ? 'w-9/12 h-screen' : 'w-0'">
        <div class="editor-navbar">
          <span class="text-sm block">MyToken.sol</span>
          <span class="flex gap-6 items-center">
            <div @click="copy(code)" btn text-lg active:scale-105 text-white i-bx:bxs-copy />
            <div btn text-2xl active:scale-105 text-white i-bx:bxs-cloud-download />
          </span>
        </div>
        <div class="pl-8 lg:pl-[6.688rem] pt-4 lg:pt-[3.938rem] lg:pr-[4.313rem] w-full grow overflow-y-scroll">
          <div id="asdf" v-html="printedCode" />
        </div>
      </div>
    </div>
    <template #fallback>
      <LoaderLoader />
    </template>
  </Suspense>
</template>

<style scoped lang="css">
.drawer-bg {
  @apply w-full h-full absolute z-100 flex;
}

.editor-bg {
  @apply z-30 absolute right-0 overflow-y-auto h-full flex flex-col;
  @apply bg-[#1C2434] backdrop-blur-sm;
  transition: width 800ms;
}

.editor-navbar {
  @apply min-h-16 px-8 flex items-center justify-between text-white;
  @apply bg-[#232C3D] shadow-navbar-dark;
}

#asdf>pre {
  background-color: unset;
}

#asdf {
  @apply block overflow-y-auto
}
</style>
