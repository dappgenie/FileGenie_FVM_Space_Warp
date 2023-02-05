import { Contract, ContractFactory, providers } from 'ethers';
import { ABI_ERC1155, BYTECODE_ERC1155 } from '~/utils/constants/contracts';
import { INFTStructure } from "~/utils/interfaces/NFT";
import { storeNFT, storeNFTCollection } from './NFTStorage.service';
const { addToast } = useToastStore()
const { address } = storeToRefs(useWeb3Store())

export class Web3Service {
  constructor() { }

  async deployNFT () {
    const { ethereum } = window
    if (!ethereum) {
      addToast('Oh Snap!', 'Ethereum provider not found', 'error')
      return false
    }
    if(ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factory = new ContractFactory(ABI_ERC1155, BYTECODE_ERC1155, signer)
      // If your contract requires constructor args, you can specify them here
      const contract = await factory.deploy("");
      return contract.address
    }
  }

  async uploadNFT (data: INFTStructure) : Promise<{cid: string, uri: string} | null> {
    const cid = await storeNFT(data)
    console.log("🚀 ~ file: web3.service.ts:10 ~ Web3Service ~ uploadNFT ~ cid", cid)
    if(cid) {
      addToast('Success', 'NFT data stored!', 'success')
      const uri = `https://ipfs.io/ipfs/${cid}`
      return {cid, uri}
    }
    else {
      addToast('Error', 'NFT data not stored!', 'error')
      return null
    }
  }
  async uploadNFTCollection (files: File[], metaData: any) : Promise<string | null> {
    const cid = await storeNFTCollection(files, metaData)
    console.log("🚀 ~ file: web3.service.ts:10 ~ Web3Service ~ uploadNFT ~ cid", cid)
    if(cid) {
      addToast('Success', 'NFT data stored!', 'success')
      return cid
    }
    else {
      addToast('Error', 'NFT data not stored!', 'error')
      return null
    }
  }
  async mintNFT (contractAddress: string, uri: string, amount: number) {
    const { ethereum } = window
    if (!ethereum) {
      addToast('Oh Snap!', 'Ethereum provider not found', 'error')
      return false
    }
    if(ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(contractAddress, ABI_ERC1155, signer)
      const tx = await contract.mint(address.value, amount, "", uri)
      await tx.wait()
      return tx.hash
    }
  }
}
