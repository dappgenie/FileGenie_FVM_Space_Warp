<script lang="ts" setup>
import logo from '~/assets/images/logo.png'
// const { isLoading } = storeToRefs(useLoaderStore())
const router = useRouter()
const isOpen = ref<boolean>(false)
</script>

<template>
  <div :class="$style.header">
    <div :class="$style.navbar">
      <img cursor-pointer h-8 md:h-16 w-auto :src="logo" alt="logo" @click="router.push('/')">
      <div flex md:hidden gap-6 justify-end items-center>
        <DarkToggle />
        <button btn text-xl text-color-primary active:text-2xl i-mdi:menu @click="isOpen = !isOpen" />
      </div>
      <div :class="$style.menu">
        <DarkToggle />
        <!-- <SocialLogin/> -->
        <Web3Login type="header" />
      </div>
    </div>
  </div>
</template>

<style module lang="css">
.header {
  @apply w-screen z-50 fixed background flex justify-between items-center flex-col;
}

.navbar {
  @apply border-b-1 border-border-color dark:border-primary w-full flex justify-between items-center py-5 px-4 md:px-10 xl:px-12 2xl:px-14;
}

.mob-nav {
  @apply font-bold background block space-y-3 text-center transition-all overflow-hidden transition-all;
}

.menu {
  @apply hidden md:flex justify-end items-center text-base font-bold gap-x-12;
}
</style>
