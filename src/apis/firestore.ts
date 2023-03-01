import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBWe07EkNKzrrBp5R8JUF7q6d2FU7NWkjQ",
  authDomain: "futurum-crud-53965.firebaseapp.com",
  projectId: "futurum-crud-53965",
  storageBucket: "futurum-crud-53965.appspot.com",
  messagingSenderId: "618294064907",
  appId: "1:618294064907:web:dd5bd6f01983064958d40e",
};

const app = initializeApp(firebaseConfig);

export const firebase = getFirestore(app);
