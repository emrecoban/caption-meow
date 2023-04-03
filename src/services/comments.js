import { db } from "./firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";

export async function addComment(uId, comment, catId) {
  const newCommRef = doc(collection(db, "comments"));
  const addResponse = await setDoc(newCommRef, {
    uId: doc(db, "users", uId),
    catRef: doc(db, "cats", catId),
    comment: comment,
    commentScore: 1,
  });
  return addResponse;
}

export async function getComments(catId) {
  const q = query(
    collection(db, "comments"),
    where("catRef", "==", doc(db, "cats", catId))
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

export async function commentScore(commId) {
  await updateDoc(doc(db, "comments", commId), {
    commentScore: increment(1),
  });
}

// for Promise.all at the Home page
export async function getAllComments(){
  const querySnapshot = await getDocs(collection(db, "comments"));
  const comments = [];
  querySnapshot.forEach((comment) => {
    comments.push({
      Id: comment.id,
      uId: comment.data().uId.id,
      comment: comment.data().comment,
      commentScore: comment.data().commentScore,
      catRef: comment.data().catRef.id,
    })
  });
  return comments;
}