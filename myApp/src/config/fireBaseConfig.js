// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApxje3OrzllffjUrREho26tWktvzr2SY4",
  authDomain: "library-project-aea6f.firebaseapp.com",
  projectId: "library-project-aea6f",
  storageBucket: "library-project-aea6f.firebasestorage.appspot.app",
  messagingSenderId: "926846727879",
  appId: "1:926846727879:web:7cddcd99989f14c16070e2",
  measurementId: "G-MZLD48RRRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);