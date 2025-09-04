// Firebase configuration and initialization
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC1gn21bYDJVTo9XTNPMkldAn8KiIkg0sA",
  authDomain: "student-profile-systems.firebaseapp.com",
  projectId: "student-profile-systems",
  storageBucket: "student-profile-systems.firebasestorage.app",
  messagingSenderId: "365043493776",
  appId: "1:365043493776:web:93f11753336985dc136115",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
