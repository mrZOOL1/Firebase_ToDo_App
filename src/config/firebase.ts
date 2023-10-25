// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "todo-e558d.firebaseapp.com",
    projectId: "todo-e558d",
    storageBucket: "todo-e558d.appspot.com",
    messagingSenderId: "393398687229",
    appId: "1:393398687229:web:bbe47136f5b2011be83594"
};
const app = initializeApp(firebaseConfig);

export default app;

export const db = getFirestore(app);