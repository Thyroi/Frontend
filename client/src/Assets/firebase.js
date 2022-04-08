import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYz45AQoyd9D49Er_XXzS5qGRs2-nn3Ug",
  authDomain: "pfhenry-70268.firebaseapp.com",
  projectId: "pfhenry-70268",
  storageBucket: "pfhenry-70268.appspot.com",
  messagingSenderId: "139071617946",
  appId: "1:139071617946:web:4c15c0b8cb03652219d823",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);