import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
  const apiLoading = ref(false)
  // const startApiLoading = () => {
  //   apiLoading.value = true
  // }
  // const stopApiLoading = () => {
  //   apiLoading.value = false
  // }
  const toggleLoading = () => {
    apiLoading.value = !apiLoading.value
  }
  return {
    apiLoading,
    toggleLoading,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLoaderStore, import.meta.hot))
