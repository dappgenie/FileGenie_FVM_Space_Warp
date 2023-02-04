<script lang="ts" setup>
</script>

<template>
  <div class="sub-header">
    <div class="text-white text-xs font-bold">
      <slot name="path"/>
    </div>
    <div class="flex items-center justify-end">
      <slot name="content"/>
    </div>
  </div>
</template>

<style scoped lang="css">
  .sub-header {
    @apply z-20 h-14 w-full background-secondary border-y border-gray-200 dark:border-gray-600 backdrop-blur items-center sticky top-16;
    @apply flex flex-none justify-between items-center py-8 px-8 md:px-14;
  }
</style>
