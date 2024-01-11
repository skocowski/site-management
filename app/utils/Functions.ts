import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export async function readData() {
  console.log("read all permits");

  const querySnapshot = await getDocs(collection(db, "permits"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}

export async function readUser(userId: string) {
  const docSnap = await getDoc(doc(db, "users", userId));

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function fetchPermits() {
  let tempResult = <any>[];
  const querySnapshot = await getDocs(collection(db, "permits"));

  querySnapshot.forEach((doc) => {
    tempResult.push(doc.data());
  });

  return tempResult;
}

/* async function rejectPermit(permitId: string) {
  const ref = doc(db, "permits", permitId);
  try {
    let status = "rejected";
    let reason = "same babole";

    await updateDoc(ref, { status: status, reason: reason }, { merge: true });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
} */

/* export async function writeData() {
  console.log("write permit to db");

  let permitId = "phuket=" + Date.now();

  let permit = {
    applicant: "me" + permitId,
    company: "Microsoft",
    contactNumber: "0121",
    location: "Rawai",
    type: "y",
  };

  console.log(permit);
  const ref = doc(db, "permits", permitId);
  try {
    await setDoc(ref, permit, { merge: true });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
} */
