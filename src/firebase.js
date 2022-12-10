// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBChxWQQwxeHdcWMZsE2fEYMAxE9z7bwo0",
  authDomain: "game-react-6faec.firebaseapp.com",
  projectId: "game-react-6faec",
  storageBucket: "game-react-6faec.appspot.com",
  messagingSenderId: "170038235016",
  appId: "1:170038235016:web:670951955f442802ff343d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;