import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbLMw5_a5ytFA5QhWdTxDlalnV6FQ18D0",
  authDomain: "almost-insta-1ed59.firebaseapp.com",
  projectId: "almost-insta-1ed59",
  storageBucket: "almost-insta-1ed59.firebasestorage.app",
  messagingSenderId: "895655496188",
  appId: "1:895655496188:web:76556d97985450479c8a79",
  measurementId: "G-26QKC257LM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };