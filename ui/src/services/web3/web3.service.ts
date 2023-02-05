import { ethers } from "ethers";
import { INFTStructure } from "~/utils/interfaces/NFT";
import { storeNFT } from './NFTStorage.service';
const { addToast } = useToastStore()

export class Web3Service {
  constructor() { }
  async uploadNFT (data: INFTStructure) : Promise<string | null> {
    const cid = await storeNFT(data)
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
}
