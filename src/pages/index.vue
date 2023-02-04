<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useWeb3Store()

const router = useRouter()
const go = () => {
    router.push(`/files`)
}

</script>

<template>
  <div w-screen h-screen absolute top-0>
    <div class="text-center m-auto max-w-[55%] h-54">
      <h1 class="text-[5rem] font-black mt-48">FILE GENIE</h1>
      <p class="text-[2rem] font-bold mt-6">A Decentralised File Storage System</p>
      <Button m-auto mt-8>
        <template #content>
           Open File Genie
        </template>
      </Button>

    </div>
  </div>
</template>

