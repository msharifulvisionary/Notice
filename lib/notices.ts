// Firebase operations for notices
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore"
import { db } from "./firebase"
import type { Notice, NoticeFormData } from "@/types/notice"

const COLLECTION_NAME = "notices"

export async function addNotice(noticeData: NoticeFormData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...noticeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding notice:", error)
    throw error
  }
}

export async function getNotices(): Promise<Notice[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Notice,
    )
  } catch (error) {
    console.error("Error getting notices:", error)
    throw error
  }
}

export async function updateNotice(id: string, noticeData: NoticeFormData): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...noticeData,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error updating notice:", error)
    throw error
  }
}

export async function deleteNotice(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
  } catch (error) {
    console.error("Error deleting notice:", error)
    throw error
  }
}
