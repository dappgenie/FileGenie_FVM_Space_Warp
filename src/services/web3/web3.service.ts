import { Contract, ContractFactory, providers, utils } from 'ethers';
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
      const contract = await factory.deploy();
      console.log("🚀 ~ file: web3.service.ts:23 ~ Web3Service ~ deployNFT ~ contract", contract)
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
  async uploadNFTCollection (files: File[], metaData: any) : Promise<{ metaDataCids: string, ids: string[] } | null> {
    const res = await storeNFTCollection(files, metaData)
    console.log("🚀 ~ file: web3.service.ts:10 ~ Web3Service ~ uploadNFT ~ cid", res)
    if(res) {
      addToast('Success', 'NFT data stored!', 'success')
      return res
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
      const data = utils.hexlify(utils.toUtf8Bytes(""));
      const tx = await contract.mint(address.value, amount, data, uri)
      await tx.wait()
      return tx.hash
    }
  }
  async mintNFTCollection (contractAddress: string, ids: string[], amount: number[]) {
    const { ethereum } = window
    if (!ethereum) {
      addToast('Oh Snap!', 'Ethereum provider not found', 'error')
      return false
    }
    if(ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(contractAddress, ABI_ERC1155, signer)
      const data = utils.hexlify(utils.toUtf8Bytes(""));
      const tx = await contract.mintBatch(address.value, ids, amount, data)
      await tx.wait()
      return tx.hash
    }
  }
}
