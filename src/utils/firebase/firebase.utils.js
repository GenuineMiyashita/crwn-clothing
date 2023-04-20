import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTuDpFp-XwhqXzPnYvR5B5b9o80b-YvCU",
  authDomain: "crwn-clothing-db-997fb.firebaseapp.com",
  projectId: "crwn-clothing-db-997fb",
  storageBucket: "crwn-clothing-db-997fb.appspot.com",
  messagingSenderId: "58271596950",
  appId: "1:58271596950:web:70cc0f1708a9ec028a5db7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google sign-in
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the users", error.message);
    }
  }

  return userDocRef;
};
