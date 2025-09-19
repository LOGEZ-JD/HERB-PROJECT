// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 🔒 In production, move this config into environment variables (.env)
const firebaseConfig = {
  apiKey: "AIzaSyD__oBHowXxchNzbRPSYeFqRRfzV4xyxOU",
  authDomain: "herb-tracz.firebaseapp.com",
  projectId: "herb-tracz",
  storageBucket: "herb-tracz.firebasestorage.app",
  messagingSenderId: "600714731072",
  appId: "1:600714731072:web:1b1992d6909239ca9a09a5",
  measurementId: "G-NZHR04H64N",
};

// Initialize Firebase core
const app = initializeApp(firebaseConfig);

// Firestore (main database)
export const db = getFirestore(app);

// Auth
export const auth = getAuth(app);

// Analytics (safe init)
let analytics = null;
try {
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} catch (err) {
  console.warn("Firebase Analytics not initialized:", err);
}

export default app;
