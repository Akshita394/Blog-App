// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dd572.firebaseapp.com",
  projectId: "mern-blog-dd572",
  storageBucket: "mern-blog-dd572.firebasestorage.app",
  messagingSenderId: "396322270858",
  appId: "1:396322270858:web:365a745a4ace5124d78773"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);