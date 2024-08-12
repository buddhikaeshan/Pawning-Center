// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_lVwTCn9ZwpqbplatAIq9OkK49xyP7G4",
  authDomain: "nmtest-846f6.firebaseapp.com",
  databaseURL: "https://nmtest-846f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nmtest-846f6",
  storageBucket: "nmtest-846f6.appspot.com",
  messagingSenderId: "330671817978",
  appId: "1:330671817978:web:3dc17dc13f4ee6c8497543",
  measurementId: "G-NEQSWWM3SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);