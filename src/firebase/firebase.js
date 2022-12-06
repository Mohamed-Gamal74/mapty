import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";



const firebaseAuth = firebase.initializeApp({
  apiKey: "AIzaSyDsppWPhBpWZGJnDB_56bpaXc5zTzSB5oI",
  authDomain: "mapty-ebde9.firebaseapp.com",
  projectId: "mapty-ebde9",
  storageBucket: "mapty-ebde9.appspot.com",
  messagingSenderId: "69104819061",
  appId: "1:69104819061:web:f644f35a118d14a47cd13c",
});

export const auth = firebaseAuth.auth();
export const db = firebaseAuth.firestore();

export default firebaseAuth;
