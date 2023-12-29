import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,

} from "firebase/auth";



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

export {app, auth }