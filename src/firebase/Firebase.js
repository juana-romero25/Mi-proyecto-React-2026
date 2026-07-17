import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlRuyGySuqnkZn2NZDi3Bo_R4o5zbOBiA",
  authDomain: "pet-store-01.firebaseapp.com",
  projectId: "pet-store-01",
  storageBucket: "pet-store-01.firebasestorage.app",
  messagingSenderId: "744037178522",
  appId: "1:744037178522:web:190757792822ade0539323"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);