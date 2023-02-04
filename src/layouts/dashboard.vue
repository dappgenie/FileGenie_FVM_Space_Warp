<script lang="ts" setup>
</script>

<template>
  <div id="dashboard-layout" class="w-screen h-screen flex font-primary" name="dashboard-layout">
    <!-- Define the dashboard layout here -->
    <Drawer>
      <template #page>
        <Toasts />
        <RouterView />
      </template>
    </Drawer>
  </div>
</template>
