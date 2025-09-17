// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// NOTE: for security, move these into environment variables for production.
const firebaseConfig = {
  apiKey: "AIzaSyD__oBHowXxchNzbRPSYeFqRRfzV4xyxOU",
  authDomain: "herb-tracz.firebaseapp.com",
  projectId: "herb-tracz",
  storageBucket: "herb-tracz.firebasestorage.app",
  messagingSenderId: "600714731072",
  appId: "1:600714731072:web:1b1992d6909239ca9a09a5",
  measurementId: "G-NZHR04H64N",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics only when running in a browser environment
let analytics = null;
try {
  // getAnalytics requires a window/document (browser). This avoids crashes in SSR/test environments.
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} catch (err) {
  // Fail silently — analytics isn't critical for app functionality.
  // You can optionally log to console during development:
  // console.warn("Firebase analytics not initialized:", err);
}

// Auth export (named) — import with: import { auth } from "./firebase";
export const auth = getAuth(app);

// Optional default export (app) if you prefer: import app from "./firebase";
export default app;
