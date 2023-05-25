// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNR2SM__kh-ybMLR0Nw-jnGK9Bw7ukgTs",
  authDomain: "mini-project-e6254.firebaseapp.com",
  projectId: "mini-project-e6254",
  storageBucket: "mini-project-e6254.appspot.com",
  messagingSenderId: "1099153164678",
  appId: "1:1099153164678:web:9fbbd81fdaa47a395f8407",
  measurementId: "G-FRGVL9DNN6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
