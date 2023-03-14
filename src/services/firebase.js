import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqLD83kRrJvVCF6BfLlVXFxiBkYYnrZK4",
  authDomain: "caption-cat.firebaseapp.com",
  projectId: "caption-cat",
  storageBucket: "caption-cat.appspot.com",
  messagingSenderId: "755255591044",
  appId: "1:755255591044:web:945a17b95ebf403a2cc2d1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);