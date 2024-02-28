// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogbreeze-414211.firebaseapp.com",
  projectId: "blogbreeze-414211",
  storageBucket: "blogbreeze-414211.appspot.com",
  messagingSenderId: "464079278819",
  appId: "1:464079278819:web:140743ef88243ec05cabd6",
  measurementId: "G-L7CWSE1J9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);