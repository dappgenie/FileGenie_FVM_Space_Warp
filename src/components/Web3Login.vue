<script lang="ts" setup>

const { address } = storeToRefs(useWeb3Store())
const { connectWallet } = useWeb3Store()

interface ILoginProps {
  type: 'header' | 'header-mob' | 'basic'
}
interface ILoginEmits {
  (e: 'login'): void
}
defineProps<ILoginProps>()
const emit = defineEmits<ILoginEmits>()
const login = async() => {
  const res = await connectWallet()
  if(res) localStorage.setItem('login', 'true')
  if(address.value) emit('login')
}
const logout = async() => {
  address.value = ''
  localStorage.setItem('login', 'false')
}
onMounted(() => {
  const status = localStorage.getItem('login')
  if(!address.value && status==='true'){
    login()
  }
})
</script>

<template>

  <Button v-if="type === 'header' && !address" id="connect-wallet-header-login-btn" name="connect-wallet-header-login-btn"
    color="gradient" rounded="full" w-24 @click="login()">
    <template #content>
      Login
    </template>
  </Button>
  <Dropdown v-if="type === 'header' && address" id="connect-wallet-header-login-dropdown" parent-class="w-fit"
    name="connect-wallet-header-login-dropdown">
    <template v-slot="{ events }">
      <Button v-on="events" id="connect-wallet-btn" name="connect-wallet-btn" color="gradient" rounded="full" w-fit>
        <template #content>
          {{ `${address.substring(0, 5)}...${address.substring(address.length - 3, address.length)}` }}
        </template>
      </Button>
    </template>
    <template #content="{ attributes }">
      <div p-2 m-auto w-fit v-bind="attributes">
        <div dropdown-item @click="logout()">
          Logout
        </div>
      </div>
    </template>
  </Dropdown>

  <Button v-if="type === 'header-mob'" id="connect-wallet-header-mob-login-btn" name="connect-wallet-header-mob-login-btn"
    color="gradient" rounded="full" w-24 @click="login()">
    <template #content>
      Login
    </template>
  </Button>

  <Button v-if="type === 'basic'" id="connect-wallet-basic-login-btn" name="connect-wallet-basic-login-btn" mt-8 mx-auto
    color="base" rounded="none" @click="login()">
    <template #content>
      Click to Login
      <div class=" text-lg" i-mdi:arrow-right-thin />
    </template>
  </Button>
</template>

<style scoped lang="css">

</style>
