// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnSM5K47CLZeoNGYsL_tezrrKitR0AfXU",
  authDomain: "notdefteri-4e378.firebaseapp.com",
  projectId: "notdefteri-4e378",
  storageBucket: "notdefteri-4e378.appspot.com",
  messagingSenderId: "228860939545",
  appId: "1:228860939545:web:8ccd20e796ad8061244988"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);

export default app;