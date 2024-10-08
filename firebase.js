
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FB,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "233057066502",
  appId: "1:233057066502:web:f0048bbd521e82cc89ed87",
  measurementId: "G-KQRZBTVRY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()
const storage = getStorage(app);
export const provider = new GoogleAuthProvider()

export { storage };


// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

