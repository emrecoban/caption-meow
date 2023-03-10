import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { 
  getFirestore,
  collection,
  getDocs 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqLD83kRrJvVCF6BfLlVXFxiBkYYnrZK4",
  authDomain: "caption-cat.firebaseapp.com",
  projectId: "caption-cat",
  storageBucket: "caption-cat.appspot.com",
  messagingSenderId: "755255591044",
  appId: "1:755255591044:web:945a17b95ebf403a2cc2d1"
};

const app = initializeApp(firebaseConfig);

/* USERS/AUTH */
export const auth = getAuth(app);

export async function signIn(email, pass){
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass)
    return userCredential.user
  } catch (error) {
    throw {
        message: "Failed to log-in the system",
        errorMessage: error.message,
        errorCode: error.code
    }
  }
}

export function userControl(){
  return new Promise((resolve, reject)=>{
    onAuthStateChanged(auth, (user)=>{
      user ? resolve(true) : resolve(false)
    }, (error)=>{
      reject({
        message: "Failed to log-out the system",
        errorMessage: error.message,
        errorCode: error.code
    })
    })
  })
}

export async function signUp(email, pass){
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
    return userCredential.user
  } catch (error) {
    throw {
        message: "Failed to sign-up the system",
        errorMessage: error.message,
        errorCode: error.code
    }
  }
}


/* DATABASE */
const db = getFirestore(app);

export async function getAllCats(){
  const cat = []
  const querySnapshot = await getDocs(collection(db, "cats"))
  querySnapshot.forEach((doc)=>{
    console.log(doc, doc.data())
    cat.push({
      id: doc.id,
      data: doc.data()
    })
  })
  return cat
}
