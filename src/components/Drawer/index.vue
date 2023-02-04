<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
let showSidebar = $ref(false)
const sidebar = ref(null)
const { apiLoading } = storeToRefs(useLoaderStore())
onClickOutside(sidebar, event => (showSidebar = true))
</script>

<template>
  <div class="drawer">
    <a
      class="btn z-20 text-lg absolute text-primary dark:text-secondary left-4 top-4 sm:left-6 sm:top-6 visible md:invisible"
      i-mdi:menu
      @click="showSidebar = !showSidebar"
    />
    <div
      class="drawer-overlay visible md:invisible"
      :class="showSidebar ? 'invisible' : 'visible'"
    />
    <div
      class="drawer-side-mobile scroll-left md:drawer-side overflow-hidden md:overflow-visible"
      :class="
        showSidebar ? 'invisible w-0 md:w-full md:visible' : 'visible w-full'
      "
    >
      <DrawerSidebar ref="sidebar" />
    </div>
    <div id="loader-content" class="drawer-content" name="loader-content">
      <Header />
      <!-- 👉 Drawer Content -->
      <div p-8>
        <slot name="page" />
      </div>
      <LoaderItem v-if="apiLoading" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.drawer {
  @apply grid w-full overflow-hidden h-screen md:auto-cols-drawer;
}
.drawer-overlay {
  @apply z-20 opacity-10 bg-gray opacity-50 w-screen h-screen;
  @apply absolute top-0 left-0;
}
.scroll-left {
  transition: width 500ms;
}
.drawer-side {
  @apply col-start-1 row-start-1 overflow-visible z-40;
}
.drawer-side-mobile {
  @apply z-20 col-start-1 row-start-1 max-h-screen;
}
.drawer-content {
  @apply relative z-0 col-start-1 row-start-1 overflow-y-scroll md:col-start-2;
  @apply background transition-all duration-300;
}
</style>
