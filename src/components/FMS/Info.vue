<script lang="ts" setup>
import folderImage from '../../assets/images/files/folder.svg'
import type { IpfsDirectory, IpfsDocs } from '~/graphql'

interface IInfoProps {
  showInfo: boolean
  items: IpfsDocs[] | IpfsDirectory[]
}
interface IInfoEmits {
  (e: 'click:close', value: boolean): void
}
defineProps<IInfoProps>()
const emit = defineEmits<IInfoEmits>()
</script>

<template>
  <div :class="[$style['info-bar'], showInfo ? 'w-[30%] 2xl:w-[25%] px-4' : 'w-0 px-0']">
    <button
      class="btn btn-sm btn-circle btn-ghost absolute right-0 top-0 text-lg text-gray-400 hover:text-white font-black"
      @click="emit('click:close', false)"
    >
      ✕
    </button>
    <div v-if="!items" text-color-secondary text-sm grid place-items-center h-full>
      <div>
        <div m-auto text-lg i-bx:bxs-hide />
        There is nothing to preview.
      </div>
    </div>
    <div v-if="items.length === 1">
      <div class="w-[95%]">
        <div text-lg font-bold text-color-secondary>
          {{ items[0].name }}
        </div>
        <div text-sm font-semibold text-color-secondary>
          {{ items[0].name }}
        </div>
      </div>
      <img m-auto mb-8 :src="folderImage" alt="folder" class="h-24">
      {{ items }}
    </div>
    <div v-if="items.length > 1" text-color-secondary text-sm grid place-items-center h-full>
      <div>
        Selected {{ items.length }} items
      </div>
    </div>
  </div>
</template>

<style module lang="css">
    .info-bar {
      @apply relative overflow-hidden right-0 z-10 nav-background shadow-btn dark:shadow-btn-dark h-full;
      transition: width 300ms;
    }
</style>
