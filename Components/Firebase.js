// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9GMiL32WgPU3yurh1eFugXZsQJJozrnI",
  authDomain: "surveyapp-e1665.firebaseapp.com",
  projectId: "surveyapp-e1665",
  storageBucket: "surveyapp-e1665.appspot.com",
  messagingSenderId: "213211887406",
  appId: "1:213211887406:web:6ebd9a00dc44ae0b792cbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}