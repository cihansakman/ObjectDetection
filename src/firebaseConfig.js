// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { firebaseConfig } from "./firebase-utilities";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
