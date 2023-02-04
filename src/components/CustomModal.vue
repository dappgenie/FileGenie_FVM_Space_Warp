<script lang="ts" setup>
interface IModalProps {
  show: boolean
  hideClose?: boolean
  zIndex?: number
}
defineProps<IModalProps>()

interface IModalEmits {
  (e: 'close'): void
  (e: 'backdrop'): void
}
const emit = defineEmits<IModalEmits>()
</script>
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        @click="emit('backdrop')"
        :style="{ zIndex: zIndex ?? 100 }"
        v-if="show"
        class="modal"
      >
        <div @click="$event.stopPropagation()" class="modal-content">
          <div z-20 px-4 w-full sticky top-0  h-10 md:h-14 flex justify-between items-center>
              <div text-sm font-bold text-color >
                <slot name="title"/>
              </div>
              <button
                v-if="!hideClose"
                @click.stop="emit('close')"
                class="close-btn"
              >
                <div i-mdi:close />
              </button>
            </div>
            <div p-4 >
              <slot name="content"/>
            </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="css" scoped>
.modal {
  @apply fixed top-0 left-0 w-screen h-screen flex overflow-y-auto;
  @apply bg-gray-100 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70;
}

.modal-content {
  @apply m-auto background relative rounded-lg overflow-hidden overflow-y-auto shadow-btn dark:shadow-btn-dark;
  /* @apply min-w-[80%] md:min-w-[70%] lg:min-w-[40%]  */
}
.close-btn {
  @apply absolute top-0 right-0 z-40 m-2 w-8 h-8 opacity-20 hover:opacity-100;
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
.modal-leave-active .modal-content {
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
