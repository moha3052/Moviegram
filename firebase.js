// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt_RZSdKoLvyL6zEq3W_UGWDmhHIYVP7E",
  authDomain: "moviegram-27e93.firebaseapp.com",
  projectId: "moviegram-27e93",
  storageBucket: "moviegram-27e93.firebasestorage.app",
  messagingSenderId: "565369207406",
  appId: "1:565369207406:web:d181bf2624f91bd691047f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
export { app, database, auth };
