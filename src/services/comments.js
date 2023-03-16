import { db } from "./firebase";
import { 
    doc, 
    setDoc,
    collection,
    query,
    where,
    getDocs 
} from "firebase/firestore"; 

export async function addComment(uId, comment, catId){
    const newCommRef = doc(collection(db, "comments"));
    const addResponse = await setDoc(newCommRef, {
        catRef: doc(db, "cats", catId),
        comment: comment,
        commentScore: 1,
        uId: uId 
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