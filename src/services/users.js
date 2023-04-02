import { auth } from "./firebase";
import { db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  doc,
  increment,
  setDoc,
  updateDoc,
  query,
  limit,
  where,
  collection,
  orderBy,
  getDocs,
} from "firebase/firestore";

export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export async function registerUser({ email, password }) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential.user) {
    const splitEmail = email.split("@")[0];
    await updateProfile(auth.currentUser, {
      displayName: splitEmail,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      displayName: splitEmail,
      email: email,
      score: 0,
    });
  }
  return userCredential.user;
}

export async function reAuth(currPass) {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currPass
  );
  const reLogin = reauthenticateWithCredential(auth.currentUser, credential);
  return reLogin;
}

export async function userDBUpdate(name) {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    displayName: name,
  });
  return true;
}

export async function userScoreUp(userId) {
  await updateDoc(doc(db, "users", userId), { score: increment(1) });
}

export async function getUsers() {
  const q = query(
    collection(db, "users"),
    where("score", ">", 1),
    orderBy("score", "desc"),
    limit(30)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}
