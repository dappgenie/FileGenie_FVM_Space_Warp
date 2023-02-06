import { useCollection, useFirestore } from 'vuefire'
import { collection, addDoc, getDoc, deleteDoc, doc, query } from 'firebase/firestore'
const db = useFirestore()

// Create a new folder by adding a new document to the collection
export const createFolder = async (name: string,user:string) => {
  await addDoc(collection(db, 'folders'), {
    name,
  })
}

// Delete a folder by removing the document from the collection
export const deleteFolder = async (id: string) => {
  await deleteDoc(doc(db, 'folders', id))
}

// Get all folders by user id
export const getFolders = async (userId: string) => {
  const folders = collection(db, 'folders')
  console.log("🚀 ~ file: folder.service.ts:20 ~ getFolders ~ folders", folders)
  
}
