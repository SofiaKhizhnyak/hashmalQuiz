import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH2ZRIyDXej1kUiE85wLgLfo2Pp6Ifz7k",
  authDomain: "the-hashmal-quiz.firebaseapp.com",
  projectId: "the-hashmal-quiz",
  storageBucket: "the-hashmal-quiz.firebasestorage.app",
  messagingSenderId: "416126778544",
  appId: "1:416126778544:web:01963381a9f770dc600f75",
  measurementId: "G-XLGBXK7JDB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
