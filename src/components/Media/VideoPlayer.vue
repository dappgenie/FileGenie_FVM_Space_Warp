<script setup lang="ts">
import video_bg from '../../assets/images/files/video_bg.png'
import type { IpfsDocs } from '~/graphql'
interface IVideoPlayerEmits {
  (e: 'open:file', value: IpfsDocs): void
  (e: 'select:file', value: IpfsDocs): void
}
interface IVideoPlayerProps {
  file: IpfsDocs
  poster?: string
}
const props = defineProps<IVideoPlayerProps>()
defineEmits<IVideoPlayerEmits>()
const player = $ref<HTMLDivElement>()
const { toggle, isFullscreen } = useFullscreen(player)
const video = ref<HTMLVideoElement>()
const loop = ref(false)
const poster = props.poster ? props.poster : video_bg
const controls = useMediaControls(video, {
  src: {
    src: 'https://ipfs.io/ipfs/bafybeiepnbzi73z3lgmvp7t3m3gvzfu2lahmfayooppm4hj2oyermoc2zy?filename=Malayankunju.2022.720p.AMZN.WEB-DL.HEVC.DDP.mkv',
    type: props.file.fileType,
  },
})

const {
  playing,
  buffered,
  currentTime,
  duration,
  tracks,
  waiting,
  selectedTrack,
  volume,
  muted,
  isPictureInPicture,
  supportsPictureInPicture,
  togglePictureInPicture,
  enableTrack,
  disableTrack,
} = controls
// const text = stringify(reactive(controls))
const endBuffer = computed(() => buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0)
const formatDuration = (seconds: number) => new Date(1000 * seconds).toISOString().slice(14, 19)
</script>

<template>
  <div
    ref="player"
    class="outline-none flex flex-col justify-between"
    :tabindex="0"
    autofocus
    w-full
    @keydown.prevent.space="playing = !playing"
    @keydown.right="currentTime += 10"
    @keydown.left="currentTime -= 10"
  >
    <div
      class="relative flex background rounded-md shadow overflow-hidden"
      :class="isFullscreen ? 'h-full' : 'h-[92%]'"
    >
      <video
        ref="video"
        crossorigin="anonymous"
        class="w-full block m-auto"
        :poster="poster"
        :loop="loop"
        @click="playing = !playing"
      />
      <div
        v-if="waiting"
        class="absolute inset-0 grid place-items-center pointer-events-none bg-black/20"
      >
        <MediaSpinner />
      </div>
    </div>
    <div
      class="w-full"
      :class="isFullscreen ? 'absolute bottom-0 h-16' : 'h-[6%]'"
    >
      <MediaScrubber v-model="currentTime" :max="duration" :secondary="endBuffer">
        <template #default="{ position, pendingValue }">
          <div
            class="absolute transform -translate-x-1/2 bg-black rounded px-2 bottom-0 mb-4 py-1 text-xs text-white"
            :style="{ left: position }"
          >
            {{ formatDuration(pendingValue) }}
          </div>
        </template>
      </MediaScrubber>

      <div class="flex flex-row items-center items-center gap-2">
        <button @click="playing = !playing">
          <i v-if="!playing" inline-block align-middle i-carbon-play />
          <i v-else i-carbon-pause inline-block align-middle />
        </button>
        <button @click="muted = !muted">
          <i v-if="muted" i-carbon-volume-mute inline-block align-middle />
          <i v-else i-carbon-volume-up inline-block align-middle />
        </button>
        <MediaScrubber v-model="volume" :max="1" class="w-32 ml-2" />
        <div
          class="flex flex-col flex-1 text-sm ml-2"
        >
          {{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}
        </div>

        <button @click="toggle">
          <i v-if="!isFullscreen" inline-block align-middle i-mdi:fullscreen />
          <i v-else i-mdi:fullscreen-exit inline-block align-middle />
        </button>
        <MediaMenu class="mr-2">
          <template #default="{ open }">
            <button @click="open">
              <i i-carbon-closed-caption inline-block align-middle />
            </button>
          </template>
          <template #menu="{ close }">
            <div class="absolute bottom-0 right-0 bg-black rounded py-2 shadow">
              <MediaMenuItem
                @keydown.stop.prevent.enter.space="disableTrack()"
                @click="() => { disableTrack(); close() }"
              >
                <span class="flex-1">Off</span>
                <i i-carbon-checkmark inline-block align-middle :class="{ 'opacity-0': selectedTrack !== -1 }" />
              </MediaMenuItem>
              <MediaMenuItem
                v-for="track in tracks"
                :key="track.id"
                @keydown.stop.prevent.enter.space="enableTrack(track)"
                @click="() => { enableTrack(track); close() }"
              >
                <span class="flex-1">{{ track.label }}</span>
                <i i-carbon-checkmark inline-block align-middle :class="{ 'opacity-0': track.mode !== 'showing' }" />
              </MediaMenuItem>
            </div>
          </template>
        </MediaMenu>
        <MediaMenu class="mr-2">
          <template #default="{ open }">
            <button class="block" @click="open()">
              <i i-carbon-settings inline-block align-middle />
            </button>
          </template>
          <template #menu="{ close }">
            <div class="absolute bottom-0 right-0 shadow py-2 bg-black rounded">
              <MediaMenuItem
                v-if="supportsPictureInPicture"
                @click="() => { togglePictureInPicture(); close(); }"
              >
                <i i-carbon-popup />
                <span>{{ isPictureInPicture ? 'Exit' : 'Enter' }} Picture in Picture</span>
              </MediaMenuItem>
              <MediaMenuItem @click="() => { loop = !loop; close(); }">
                <i i-carbon-repeat />
                <span class="flex-1">Loop</span>
                <i v-if="loop" i-carbon-checkmark />
              </MediaMenuItem>
            </div>
          </template>
        </MediaMenu>
        <MediaMenu>
          <template #default="{ open }">
            <button class="block" @click="open()">
              <i i-carbon-meter inline-block align-middle />
            </button>
          </template>
          <template #menu="{ close }">
            <div class="absolute bottom-0 right-0 shadow py-2 bg-black rounded">
              <MediaMenuItem @click="() => { controls.rate.value = 2; close(); }">
                <i i-carbon-meter-alt />2x
              </MediaMenuItem>
              <MediaMenuItem @click="() => { controls.rate.value = 1; close(); }">
                <i i-carbon-meter-alt />1x
              </MediaMenuItem>
            </div>
          </template>
        </MediaMenu>
      </div>
    </div>
  </div>
  <!-- <pre class="code-block" lang="yaml">{{ text }}</pre> -->
</template>

