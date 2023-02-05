import { ethers } from "ethers";
const { addToast } = useToastStore()
const { address } = storeToRefs(useUserStore())

export class Web3Service {
  constructor() { }

  // async getContractInstance { return new web3.eth.Contract(BUK_ABI, contractAddress); };

  async connectWallet() {
    if (!address.value) {
      const { ethereum } = window
      if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
      }
      const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
      address.value = myAccounts[0]
      let provider = new ethers.providers.Web3Provider(ethereum)
      const { name, chainId } = await provider.getNetwork();
      if (chainId !== 80001) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [getNetworks[80001]]
        });
      }
      return address.value
    }
  }
}
