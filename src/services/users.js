import { auth } from "./firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";


export async function loginUser({email, password}){
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export async function registerUser({email, password}){
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const getUser = () => {
    if(auth.currentUser === null) return
    const { currentUser } = auth
    return {
        email: currentUser.email,
        verified: currentUser.verified
    }
}