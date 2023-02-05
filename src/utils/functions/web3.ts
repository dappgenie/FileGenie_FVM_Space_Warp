export async function createBlobFromAsset(filepath: string): Promise<Blob | null> {
  try {
    const response = await fetch(filepath);
    const data = await response.blob();
    const image = new Blob([data], { type: data.type });
    console.log("🚀 ~ file: web3.ts:11 ~ createBlobFromAsset ~ image", image)
    return image;
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function displayIcon(cid: string): Promise<string> {
  const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  const objectURL = URL.createObjectURL(blob);
  return objectURL
}

export function makeGatewayURL(cid: string) {
  return `https://ipfs.io/ipfs/${cid}`
}
