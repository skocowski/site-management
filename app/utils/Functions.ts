import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, functions } from "../firebase/config";
import { httpsCallable } from "firebase/functions";


/* export const fetchPermit = (permitId: string) => {
  let getPermit = httpsCallable(functions, "getPermit");

  try {
    getPermit({ id: permitId })
      .then((result) => {
        console.log("result");
        console.log(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (ex) {
    console.log(ex);
  }
}; */

export const fetchPermit = async (permitId: string) => {
  const getPermit = httpsCallable(functions, "getPermit");

  try {
    const result = await getPermit({ id: permitId });

    return result.data
   
  } catch (e) {
    console.log(e);
  }
};



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

export async function fetchPermitById(permitId: string) {
  const permitDocRef = doc(db, "permits", permitId);

  try {
    const permitDocSnapshot = await getDoc(permitDocRef);

    if (permitDocSnapshot.exists()) {
      return permitDocSnapshot.data();
    } else {
      throw new Error(`Permit with ID ${permitId} not found`);
    }
  } catch (error) {
    console.error("Error fetching permit:", error);
    throw error;
  } 
}


export async function reviewPermit(permitId: string, newStatus: string, newReason: string) {
  const ref = doc(db, "permits", permitId);
  try {
    let status = newStatus
    let reason = newReason

        const dataToUpdate = {
          status: status,
          reason: reason,
        };

    await updateDoc(ref, dataToUpdate as any, { merge: true });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
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
