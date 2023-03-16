import { auth } from "./firebase";
import { db } from "./firebase";

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";
import { 
    doc, 
    setDoc,
    updateDoc 
} from "firebase/firestore";


export async function loginUser({email, password}){
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export async function registerUser({email, password}){
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if(userCredential.user){
        const splitEmail = email.split('@')[0]
        await updateProfile(auth.currentUser, {
            displayName: splitEmail
        })
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            displayName: splitEmail,
            email: email,
            score: 0,
        })
    }
    return userCredential.user
}

export async function reAuth(currPass){
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currPass
    )
    const reLogin = reauthenticateWithCredential(auth.currentUser, credential)
    return reLogin
}

export async function userDBUpdate(name){
    const update = await updateDoc(
        doc(db, "users", auth.currentUser.uid), 
        { displayName: name }
    )
    return true
}

/* export async function updateUser({displayName}){
    const success = await updateProfile(auth.currentUser, {displayName})
    return success
}

export async function updatePass(newPass){
    const success = await updatePassword(auth.currentUser, newPass)
    return success
} */

/* export const getUser = () => {
    if(auth.currentUser === null) return
    const { currentUser } = auth
    return {
        email: currentUser.email,
        verified: currentUser.verified
    }
} */