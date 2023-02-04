<script lang="ts" setup>
const Drawer = ref(false)
interface IButtonProps {
  bg?: string
  drawerOpen?: string
}
defineProps<IButtonProps>()
</script>

<template>
  <div
    class="w-full shadow-btn dark:shadow-btn-dark rounded-xl"
    :class="bg ? bg : 'background-secondary'"
  >
    <div
      class="px-3 py-2 md:px-6 md:py-3 w-full flex justify-between items-center dropdown-animate transition-all"
      :class="Drawer ? 'expand' : 'h-fit'"
    >
      <slot name="title"> </slot>
      <AAvatar
        icon="i-carbon-caret-up"
        color="success"
        class="font-bold color_dark duration-300 ease-in-out"
        :class="Drawer ? 'rotate-0' : 'rotate-180'"
        @click="Drawer = !Drawer"
      />
    </div>
    <div
      class="w-full dropdown-animate transition-all overflow-hidden"
      :class="Drawer ? 'expand opacity-100' : 'max-h-0 opacity-0'"
    >
      <div px-3 pt-2 pb-4 md:px-7 md:pb-8>
        <slot name="content"> </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.dropdown-animate {
  transition: max-height 400ms, opacity 400ms;
}
.expand {
  max-height: 100vh;
}
.color_dark {
  @apply text-[#5E5E5E] dark:text-white;
}
</style>
