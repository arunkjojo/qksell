import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase configuration - Replace with your own config
// const firebaseConfig = {
//   apiKey: "AIzaSyDeMEPEs6idbz76ZDktB8qM4n5lcu5vC7M",
//   authDomain: "qksell-in.firebaseapp.com",
//   projectId: "qksell-in",
//   storageBucket: "qksell-in.firebasestorage.app",
//   messagingSenderId: "1074673549469",
//   appId: "1:1074673549469:web:95d37c7b3ecac3b268d474",
//   measurementId: "G-M5NCGE6JQX"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth, app };