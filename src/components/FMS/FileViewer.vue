<script lang="ts" setup>
import type { IpfsDocs } from '~/graphql'
interface IFileViewerProps {
  item: IpfsDocs
  show: boolean
  hideClose?: boolean
  zIndex?: number
}
interface IFileViewerEmits {
  (e: 'close'): void
  (e: 'backdrop'): void
}
defineProps<IFileViewerProps>()
const emit = defineEmits<IFileViewerEmits>()
const modalRef = $ref<HTMLDivElement>()
const { toggle, isFullscreen } = useFullscreen(modalRef)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        :style="{ zIndex: zIndex ?? 100 }"
        class="modal overlay"
        @click="emit('backdrop')"
      >
        <div
          ref="modalRef" class="modal-content open-transition"
          :class="isFullscreen ? 'modal-fullscreen' : 'max-w-file'" @click="$event.stopPropagation()"
        >
          <div v-if="!isFullscreen" z-20 w-full sticky top-0 background-secondary h-12 md:h-16 flex justify-end items-center>
            <button
              v-if="!isFullscreen && (item.fileType === 'IMAGE' || item.fileType === 'PDF')"
              class="close-btn"
              @click="toggle"
            >
              <div i-mdi:fullscreen />
              <!-- <RiCloseLine /> -->
            </button>
            <button
              v-if="!hideClose"
              class="close-btn"
              @click.stop="emit('close')"
            >
              <div i-carbon:close />
              <!-- <RiCloseLine /> -->
            </button>
          </div>
          <button
            v-if="isFullscreen && item.fileType === 'IMAGE'"
            class="absolute right-8 top-8 close-btn"
            @click="toggle"
          >
            <div i-mdi:fullscreen-exit />
            <!-- <RiCloseLine /> -->
          </button>
          <div v-if="item.fileType === 'IMAGE'" class="file-bg" :class="isFullscreen ? 'w-screen h-screen max-w-screen max-h-screen' : 'h-[32rem] md:h-[44rem] max-w-file max-h-file'">
            <img
              :src="item?.thumbUrl" alt="file" class="file-img"
              :class="isFullscreen ? 'max-h-screen max-w-screen' : 'h-[32rem] md:h-[44rem] max-h-file max-w-file'"
            >
          </div>
          <div v-else-if="item.fileType === 'PDF'" class="overflow-hidden overflow-y-auto" :class="isFullscreen ? 'w-screen h-screen max-w-screen max-h-screen' : 'h-[32rem] md:h-[44rem] max-w-file max-h-file'">
            <MediaPdfViewer :file="item" @close:fullscreen="toggle" />
          </div>
          <div v-else class="file-bg" :class="isFullscreen ? 'w-screen h-screen max-w-screen max-h-screen' : 'h-[32rem] md:h-[44rem] max-w-file max-h-file'">
            <MediaVideoPlayer :file="item" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="css" scoped>
  .modal {
    @apply fixed top-0 left-0 w-screen h-screen flex overflow-y-auto;
  }

  .modal-content {
    @apply m-auto w-[90%] relative rounded-lg overflow-hidden overflow-y-auto shadow-btn dark:shadow-btn-dark;

  }
  .max-w-file {
    max-width: 60rem;
  }
  .max-h-file {
    max-height: 40rem;
  }
  .file-bg {
    @apply flex justify-center background;
  }
  .file-img {
    @apply w-full h-full object-contain m-auto;
  }
  .open-transition {
    transition:  height 800s;
  }
  .modal-fullscreen {
    width: 100vw;
    height: auto;
  }
  .close-btn {
    @apply z-40 m-2 w-8 h-8 opacity-20 hover:opacity-100;
    @apply transition duration-300 ease-in-out;
    @apply fill-gray-800 dark:fill-gray-100;
  }
  .modal-enter-active {
    animation: fade-in 0.3s;
  }
  .modal-enter-active .modal-content {
    animation: bounce-in 0.3s;
  }
  .modal-leave-active {
    animation: fade-in 0.3s reverse;
  }
  .modal-leave-active  .modal-content {
    animation: bounce-in 0.3s reverse;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    /* 50% {
        transform: scale(1.15);
      } */
    100% {
      transform: scale(1);
    }
  }
  </style>
