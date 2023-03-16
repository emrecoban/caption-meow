import { db } from "./firebase";
import { 
    doc, 
    setDoc,
    collection,
    query,
    where,
    getDocs, 
    updateDoc,
    increment
} from "firebase/firestore"; 

export async function addComment(uId, comment, catId){
    const newCommRef = doc(collection(db, "comments"));
    const addResponse = await setDoc(newCommRef, {
        uId: doc(db, "users", uId),
        catRef: doc(db, "cats", catId),
        comment: comment,
        commentScore: 1,
    });
    return addResponse
}

export async function getComments(catId){
    console.log("gelen CatId =>", catId)
    const q = query(
        collection(db, "comments"), 
        where("catRef", "==", doc(db, "cats", catId))
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot
}

export async function commentScore(commId){
    await updateDoc(doc(db, "comments", commId), {
        commentScore: increment(1),
    })
}