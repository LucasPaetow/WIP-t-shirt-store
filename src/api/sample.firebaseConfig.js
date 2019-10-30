import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

// Firebase config
// add yours here

/*const config = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: ".",
  appId: "..."
};*/

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;
const functions = firebase.functions();
const fieldValue = firebase.firestore.FieldValue;

// firebase collections
const usersCollection = db.collection("users");
const storeCollection = db.collection("store");

export {
  auth,
  currentUser,
  usersCollection,
  storeCollection,
  functions,
  firebase,
  fieldValue
};
