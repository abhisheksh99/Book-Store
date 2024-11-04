// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJalRXg8Cg4Wzy4jKpmn8hdP3aDQN5jnI",
  authDomain: "bookstore-808ba.firebaseapp.com",
  projectId: "bookstore-808ba",
  storageBucket: "bookstore-808ba.appspot.com",
  messagingSenderId: "62526239617",
  appId: "1:62526239617:web:09a7976fa0714a70a96e80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);