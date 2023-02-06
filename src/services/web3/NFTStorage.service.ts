import { NFTStorage } from 'nft.storage'
import { INFTAttribute, INFTStructure } from '~/utils/interfaces/NFT'

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

  export async function storeNFTCollection(files: File[], metaData: any): Promise<{ metaDataCids: string, ids: string[] } | void> {
    const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_API_KEY })
    const fileCid = await client.storeDirectory(files)
    let nftCollection: File[] = []
    let fileIds: string[] = []
    files.map((file, i) => {
      let nft = {}
      const fileName = file.name
      console.log("🚀 ~ file: NFTStorage.service.ts:35 ~ files.map ~ fileName", fileName)
      const nftData = metaData[fileName]
      nft = {
        image: `https://ipfs.io/ipfs/${fileCid}/${fileName}`, // use image Blob as `image` field
        name: nftData.name,
        description: (nftData?.description) ?? '',
        attributes: (nftData?.attributes) ?? []
      }
      console.log("🚀 ~ file: NFTStorage.service.ts:38 ~ files.map ~ nft", nft)
      // const data = new File([JSON.stringify(nft)], 'metadata.json', { type: 'application/json' })
      const data = new File([JSON.stringify(nft, null, 2)], 'metadata.json')
      console.log("🚀 ~ file: NFTStorage.service.ts:43 ~ files.map ~ data", data)
      const fileData = new File([data], `${fileName}.json`);
      fileIds.push(`${fileName}.json`)
      nftCollection.push(fileData)
    })
    console.log("🚀 ~ file: NFTStorage.service.ts:49 ~ files.map ~ nftCollection", nftCollection)
    const metaDataCids = await client.storeDirectory(nftCollection)
    return {metaDataCids, ids: fileIds}
  }
