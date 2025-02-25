import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// const {
//   VITE_FIREBASE_API_KEY,
//   VITE_FIREBASE_AUTH_DOMAIN,
//   VITE_FIREBASE_PROJECT_ID,
//   VITE_FIREBASE_STORAGE_BUCKET,
//   VITE_FIREBASE_MESSAGING_SENDER_ID,
//   VITE_FIREBASE_APP_ID
//   } = import.meta.env
  

//   const firebaseConfig = {
//     apiKey: VITE_FIREBASE_API_KEY,
//     authDomain: VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: VITE_FIREBASE_PROJECT_ID,
//     storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: VITE_FIREBASE_APP_ID
//   };


const firebaseConfig = {
  apiKey: "AIzaSyASJgwuShLMGhooU4Y6jc68nVMK12MptSo",
  authDomain: "my-olx-clone-react.firebaseapp.com",
  projectId: "my-olx-clone-react",
  storageBucket: "my-olx-clone-react.firebasestorage.app",
  messagingSenderId: "300469160218",
  appId: "1:300469160218:web:8e1da519dbc9872812c4a3",
  measurementId: "G-LRDH9KLYK5"
};

//~ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const  db = getFirestore(app)



