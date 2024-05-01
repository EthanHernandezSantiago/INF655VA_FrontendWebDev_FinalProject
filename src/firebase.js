// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Wq0j0J7WGM90YmE4vqSZrX7MrxuNROw",
  authDomain: "flashcard-28b97.firebaseapp.com",
  databaseURL: "https://flashcard-28b97-default-rtdb.firebaseio.com",
  projectId: "flashcard-28b97",
  storageBucket: "flashcard-28b97.appspot.com",
  messagingSenderId: "393406587763",
  appId: "1:393406587763:web:df87fb4fec7f7c73cf1b06"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyD_Wq0j0J7WGM90YmE4vqSZrX7MrxuNROw",
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: "https://flashcard-28b97-default-rtdb.firebaseio.com",
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_API_APP_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
