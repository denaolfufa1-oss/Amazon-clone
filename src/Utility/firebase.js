// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAprgIcJ1p2fiuXTMuLFSefAbqGqeCZbtY",
  authDomain: "clone-12875.firebaseapp.com",
  projectId: "clone-12875",
  storageBucket: "clone-12875.firebasestorage.app",
  messagingSenderId: "517767885606",
  appId: "1:517767885606:web:948ceaca1c09a563ecc7e7",
  measurementId: "G-3497Q2HMYP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);