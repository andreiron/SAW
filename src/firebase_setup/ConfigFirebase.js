import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxAtFPIeYSMfIWAB32jZWjgEP3EWN4y8U",
    authDomain: "saw-calendar.firebaseapp.com",
    projectId: "saw-calendar",
    storageBucket: "saw-calendar.appspot.com",
    messagingSenderId: "254873490375",
    appId: "1:254873490375:web:be5a2847aab0f357307fe2",
    measurementId: "G-L7L2PY1GZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

