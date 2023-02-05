import { NFTStorage } from 'nft.storage'
import { INFTStructure } from '~/utils/interfaces/NFT'

  export async function storeNFT(data: INFTStructure): Promise<string | void> {
    if(data.image === null) return
    const filteredAttributes = data.attributes?.map((attribute) => {
      if(attribute.display_type === 'property') {
        return {
          trait_type: attribute.trait_type,
          value: attribute.value
        }
      } else return attribute
    })
    console.log("🚀 ~ file: NFTStorage.service.ts:6 ~ filteredAttributes ~ filteredAttributes", filteredAttributes)
    const nft = {
      image: data.image, // use image Blob as `image` field
      name: data.name,
      description: (data?.description) ?? '',
      attributes: filteredAttributes
    }
    const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_API_KEY })
    const metadata = await client.store(nft)
    console.log('NFT data stored!')
    console.log('Metadata URI: ', metadata)
    const cid = metadata.url.replace('ipfs://', '');
    return cid
  }

  export async function storeNFTCollection(data: INFTStructure[]): Promise<string | void> {
    let nftCollection: any[] = []
    data.map((nftData) => {
      let nft = {}
      if(nftData.image === null) return
      const filteredAttributes = nftData.attributes?.map((attribute) => {
        if(attribute.display_type === 'property') {
          return {
            trait_type: attribute.trait_type,
            value: attribute.value
          }
        } else return attribute
      })
      nft = {
        image: nftData.image, // use image Blob as `image` field
        name: nftData.name,
        description: (nftData?.description) ?? '',
        attributes: filteredAttributes
      }
      nftCollection.push(nft)
    })
    // const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_API_KEY })
    // const metadata: Promise<string>[] = nftCollection.map(async (nft) => {
    //   new File([JSON.stringify({'from': 'incognito'}, null, 2)], 'metadata.json')
    //   // const metadata = await client.store(nft)
    //   console.log('NFT data stored!')
    //   console.log('Metadata URI: ', metadata)
    //   const cid = metadata.url.replace('ipfs://', '');
    //   return cid
    // })
    // if(metadata.length === 0) return
    // const cids = await client.storeDirectory(metadata)
    // console.log('NFT data stored!')
    // console.log('Metadata URI: ', metadata)
    // const cid = metadata.url.replace('ipfs://', '');
    // return cid
  }
