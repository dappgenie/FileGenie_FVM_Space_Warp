import { acceptHMRUpdate, defineStore } from 'pinia'
export const useToastStore = defineStore('toast', () => {
  let showToast = ref(false)
  const toastList = ref<{
    content: string
    content2: string
    type: 'success' | 'warning' | 'error' | 'info' | 'loading'
  }[]>([])
  function toaster(value: boolean) {
    showToast = ref(value)
  }
  function addToast(content: string, content2: string, type: 'success' | 'warning' | 'error' | 'info' | 'loading') {
    toastList.value.push({ content, content2, type })
  }
  function clearToast(content: string, content2: string) {
    const index = toastList.value.findIndex((toast) => {
      return (toast.content === content && toast.content2 === content2)
    })
    toastList.value.splice(index, 1)
  }
  return {
    showToast,
    toastList,
    toaster,
    addToast,
    clearToast,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot))
