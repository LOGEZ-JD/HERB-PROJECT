// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD__oBHowXxchNzbRPSYeFqRRfzV4xyxOU",
  authDomain: "herb-tracz.firebaseapp.com",
  projectId: "herb-tracz",
  storageBucket: "herb-tracz.firebasestorage.app",
  messagingSenderId: "600714731072",
  appId: "1:600714731072:web:1b1992d6909239ca9a09a5",
  measurementId: "G-NZHR04H64N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);