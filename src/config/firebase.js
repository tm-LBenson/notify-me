import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCEThI1YujUHTCve_LBOu623N4DpLyB04k",
  authDomain: "time-clock-4e9fb.firebaseapp.com",
  projectId: "time-clock-4e9fb",
  storageBucket: "time-clock-4e9fb.appspot.com",
  messagingSenderId: "870186562943",
  appId: "1:870186562943:web:43b1d9e58e98a92d85d64a",
  measurementId: "G-ZZLF6Z1VC3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
