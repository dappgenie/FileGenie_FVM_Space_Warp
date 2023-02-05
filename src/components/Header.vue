<script lang="ts" setup>
import logo from '~/assets/images/logo.png'
interface IHeaderProps {
  main?: boolean
}
defineProps<IHeaderProps>()
// const { isLoading } = storeToRefs(useLoaderStore())
const router = useRouter()
const isOpen = ref<boolean>(false)
</script>

<template>
  <div id="header" name="header" class="header" :class="main ? 'w-screen justify-between transition-colors-1500 dark:transition-colors-1000' : 'ml-0 w-full justify-end'">
    <div :class="[ main ? 'justify-between' : 'justify-end', 'navbar']" >
      <img v-if="main" cursor-pointer h-8 md:h-16 w-auto :src="logo" alt="logo" @click="router.push('/')">
      <div flex md:hidden gap-6 justify-end items-center>
        <DarkToggle />
        <button btn text-xl text-color-primary active:text-2xl i-mdi:menu @click="isOpen = !isOpen" />
      </div>
      <div class="menu">
        <DarkToggle />
        <!-- <SocialLogin/> -->
        <Web3Login type="header" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.header {
  @apply h-20 z-50 sticky background-secondary flex items-center flex-col;
}

.navbar {
  @apply h-20 shadow-lg w-full flex items-center py-5 px-4 md:px-10 xl:px-12 2xl:px-14;
}

.mob-nav {
  @apply font-bold background-secondary block space-y-3 text-center transition-all overflow-hidden transition-all;
}

.menu {
  @apply hidden md:flex justify-end items-center text-base font-bold gap-x-12;
}
</style>
