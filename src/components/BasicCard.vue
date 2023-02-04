<script lang="ts" setup>

</script>

<template>
  <div class="rounded-r-3xl rounded-bl-3xl design px-4 py-2 lg:px-12 lg:py-8 flex flex-wrap w-full">
    <slot name="content" />
  </div>
</template>

<style scoped lang="css">
  .design{
    @apply shadow-card-box dark:shadow-card-box-dark;
    @apply bg-card-light dark:bg-header;
  }
</style>
