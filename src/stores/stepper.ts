import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStepperStore = defineStore('stepperStatus', () => {
  let is_expanded = ref(false)
  const toggleExpand = () => {
    is_expanded.value = !is_expanded.value
  }

  return {
    is_expanded,
    toggleExpand,
  }
}, { persist: true })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStepperStore, import.meta.hot))
