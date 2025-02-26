import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASJgwuShLMGhooU4Y6jc68nVMK12MptSo",
  authDomain: "my-olx-clone-react.firebaseapp.com",
  projectId: "my-olx-clone-react",
  storageBucket: "my-olx-clone-react.firebasestorage.app",
  messagingSenderId: "300469160218",
  appId: "1:300469160218:web:8e1da519dbc9872812c4a3",
  measurementId: "G-LRDH9KLYK5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); 

export { db, storage ,auth };



