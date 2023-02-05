<script lang="ts" setup>
import { get } from 'radash'
import { FILE_TYPE_ICONS } from '~/utils/repository'
interface IThumbnailProps {
  type: 'PDF' | 'DOC' | 'AUDIO' | 'VIDEO' | 'IMAGE' | 'COMPRESSED' | 'OTHER'
  url: string
  info?: boolean
}
defineProps<IThumbnailProps>()
</script>

<template>
  <img
    v-if="type === 'IMAGE'"
    :src="url"
    alt="file"
    class="object-contain m-auto"
    :class="info ? 'h-24' : 'h-full'"
  >
  <img
    v-else
    :src="get(FILE_TYPE_ICONS, f => f[type]).icon"
    alt="file"
    class="object-contain m-auto"
    :class="info ? 'h-24' : 'h-full'"
  >
</template>

<style module lang="scss"></style>
