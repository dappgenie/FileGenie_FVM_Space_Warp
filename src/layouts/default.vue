<template>
  <main class="font-sans grid background flex flex-col min-h-[100vh]">
    <Header />
    <div class="page flex-1">
      <RouterView />
      <Toasts />
    </div>
    <Footer />
  </main>
</template>

<style scoped lang="css">
.page {
  @apply relative pb-12 px-4 md:px-10 xl:px-12 2xl:px-14 mt-18 lg:mt-20 background w-screen;
}
</style>
