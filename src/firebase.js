
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyjyYiArIamKdWfxiznGfzPJUaqRw-uGs",
  authDomain: "react-questionnaire.firebaseapp.com",
  projectId: "react-questionnaire",
  storageBucket: "react-questionnaire.appspot.com",
  messagingSenderId: "962061051186",
  appId: "1:962061051186:web:23c19ea071e0611eaa632b",
  measurementId: "G-23MFEMRZ0H"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

