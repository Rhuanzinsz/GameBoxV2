import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFQbSZUUw0vI8Yt_HH9wtdiIdWflK7hb0",
  authDomain: "projetomobile-af9a3.firebaseapp.com",
  projectId: "projetomobile-af9a3",
  storageBucket: "projetomobile-af9a3.firebasestorage.app",
  messagingSenderId: "411842699518",
  appId: "1:411842699518:web:aabaf248d16d098d1cc5af",
  measurementId: "G-VB2E81Q1XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);