<template>
  <main class="font-sans grid background flex flex-col min-h-[100vh]">
    <Header :main="true" />
    <div class="page flex-1">
      <RouterView />
      <Toasts />
    </div>
    <!-- <Footer /> -->
  </main>
</template>

<style scoped lang="css">
.page {
  @apply relative pb-12 mt-14 lg:mt-16 background w-screen;
}
</style>
