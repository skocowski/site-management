import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth

} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import {getFunctions} from 'firebase/functions'



const firebaseConfig = {
  apiKey: "AIzaSyBCTrCWQWR6Fx00xjX7rYBGHFiwJXKC71o",
  authDomain: "sitemanagement-409310.firebaseapp.com",
  projectId: "sitemanagement-409310",
  storageBucket: "sitemanagement-409310.appspot.com",
  messagingSenderId: "658685053130",
  appId: "1:658685053130:web:67a4f9e178800ce4cecc33",
};

/* const app = initializeApp(firebaseConfig); */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export {app, auth, db, functions }