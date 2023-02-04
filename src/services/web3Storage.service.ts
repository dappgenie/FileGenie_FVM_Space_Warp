import { Web3Storage } from 'web3.storage'
import { INFTData, StoreImageResult } from './web3.requests';

export function makeGatewayURL(cid: string, path: string) {
  return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`
}

export function jsonFile(filename: string, obj: any) {
  return new File([JSON.stringify(obj)], filename)
}

const namePrefix = 'ImageGallery'

export async function storeImage(imageFile: File, caption: INFTData): Promise<StoreImageResult | void> {
  const uploadName = [namePrefix, caption].join('|')
  const metadataFile = jsonFile('metadata.json', {
    path: imageFile.name,
    ...caption
  })

  const token = import.meta.env.VITE_WEB3_STORAGE_API_KEY
  if (!token) {
    console.log('> ❗️ no API token found for Web3.Storage. You can add one in the settings page!')
    return
  }
  const web3storage = new Web3Storage({ token })
  console.log(`> 🤖 calculating content ID for ${imageFile.name}`)
  const cid = await web3storage.put([imageFile, metadataFile], {
    name: uploadName,
    onRootCidReady: (localCid) => {
      console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
      console.log('> 📡 sending files to web3.storage ')
    },
    onStoredChunk: (bytes) => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
  })
  const metadataGatewayURL = await makeGatewayURL(cid, 'metadata.json')
  const imageGatewayURL = await makeGatewayURL(cid, imageFile.name)
  const imageURI = `ipfs://${cid}/${imageFile.name}`
  const metadataURI = `ipfs://${cid}/metadata.json`
  await Promise.all(cid);
  return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI }
}

export async function storeFiles(imageFile: File, caption: INFTData): Promise<StoreImageResult | void> {
  const uploadName = [namePrefix, caption].join('|')
  const metadataFile = jsonFile('metadata.json', {
    path: imageFile.name,
    ...caption
  })

  const token = import.meta.env.VITE_WEB3_STORAGE_API_KEY
  if (!token) {
    console.log('> ❗️ no API token found for Web3.Storage. You can add one in the settings page!')
    return
  }
  const web3storage = new Web3Storage({ token })
  console.log(`> 🤖 calculating content ID for ${imageFile.name}`)
  const cid = await web3storage.put([imageFile, metadataFile], {
    name: uploadName,
    onRootCidReady: (localCid) => {
      console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
      console.log('> 📡 sending files to web3.storage ')
    },
    onStoredChunk: (bytes) => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
  })
  const metadataGatewayURL = await makeGatewayURL(cid, 'metadata.json')
  const imageGatewayURL = await makeGatewayURL(cid, imageFile.name)
  const imageURI = `ipfs://${cid}/${imageFile.name}`
  const metadataURI = `ipfs://${cid}/metadata.json`
  await Promise.all(cid);
  return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI }
}

export async function storeVideos(imageFile: File, caption: INFTData): Promise<StoreImageResult | void> {
  const uploadName = [namePrefix, caption].join('|')
  const metadataFile = jsonFile('metadata.json', {
    path: imageFile.name,
    ...caption
  })

  const token = import.meta.env.VITE_WEB3_STORAGE_API_KEY
  if (!token) {
    console.log('> ❗️ no API token found for Web3.Storage. You can add one in the settings page!')
    return
  }
  const web3storage = new Web3Storage({ token })
  console.log(`> 🤖 calculating content ID for ${imageFile.name}`)
  const cid = await web3storage.put([imageFile, metadataFile], {
    name: uploadName,
    onRootCidReady: (localCid) => {
      console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
      console.log('> 📡 sending files to web3.storage ')
    },
    onStoredChunk: (bytes) => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
  })
  const metadataGatewayURL = await makeGatewayURL(cid, 'metadata.json')
  const imageGatewayURL = await makeGatewayURL(cid, imageFile.name)
  const imageURI = `ipfs://${cid}/${imageFile.name}`
  const metadataURI = `ipfs://${cid}/metadata.json`
  await Promise.all(cid);
  return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI }
}


