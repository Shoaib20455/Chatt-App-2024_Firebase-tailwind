import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "shoaibsapp-86d63.firebaseapp.com",
  projectId: "shoaibsapp-86d63",
  storageBucket: "shoaibsapp-86d63.appspot.com",
  messagingSenderId: "796485759170",
  appId: "1:796485759170:web:4d662ef148931941ef0b5b"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();