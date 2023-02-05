import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useWeb3Store = defineStore('web3', () => {
  const address = ref('')

  async function getBalance() {
    try {
      const { ethereum } = window
      if (ethereum) {
        const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
        address.value = myAccounts[0]
        const provider = new ethers.providers.Web3Provider(ethereum)
        const networkDetails = await provider.getNetwork()
      }
    }
    catch (e) {
    }
  }

  async function getAccount() {
    try {
      const { ethereum } = window
      if (ethereum) {
        const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
        address.value = myAccounts[0]
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        return signer
      }
    }
    catch (e) {
    }
  }

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
      }
      await getBalance()
    }
    catch (error) {
    }
  }

  return {
    connectWallet,
    getBalance,
    address,
    getAccount,
  }
}, { persist: true })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot))
