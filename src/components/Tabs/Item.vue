<script setup>
  import { ref, onMounted } from 'vue';
  const props = defineProps([ 'active' ]);
</script>

<template>
  <div class="tab w-full h-full mt-5 lg:mt-16" :class="(active == 'true') ? 'active' : ''" ref="tabs">
    <slot name="content"></slot>
  </div>
</template>

<style>
  .tab {
    display: none;
  }
  .tab.active {
    display: block;
  }
</style>
