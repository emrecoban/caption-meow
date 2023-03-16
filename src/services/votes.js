import { db } from "./firebase";
import { 
    doc, 
    collection, 
    setDoc,
    query,
    where,
    getDocs,
    serverTimestamp 
} from "firebase/firestore";

export async function voteComment(catId, uId, commId){
    const newVoteRef = doc(collection(db, "votes"));
    const voteResponse = await setDoc(newVoteRef, {
        catId: doc(db, "cats", catId),
        userId: doc(db, "users", uId),
        commId: doc(db, "comments", commId),
        zaman: serverTimestamp()
    });
    return voteResponse
}

export async function getVotes(commId){
    const voteRef = collection(db, "votes")
    const q = query(voteRef, where("commId", "==", doc(db, "comments", commId)))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}