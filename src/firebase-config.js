// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// import { getFireStore } from 'firebase/firestore'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyKvlu9i_dWRJr2NjP3tJMNg50Tl_FVrs",
  authDomain: "mychapapp-b6e8d.firebaseapp.com",
  projectId: "mychapapp-b6e8d",
  storageBucket: "mychapapp-b6e8d.appspot.com",
  messagingSenderId: "315384989538",
  appId: "1:315384989538:web:707508f88f89fd8bc00e3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const authprovider=new GoogleAuthProvider()
export const db=getFirestore(app)
