import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvAOXX9ZcOdZy5mPFuNRWDDyVN_5TL5uw",
  authDomain: "projeto-zeus-4b95c.firebaseapp.com",
  projectId: "projeto-zeus-4b95c",
  storageBucket: "projeto-zeus-4b95c.firebasestorage.app",
  messagingSenderId: "325714977055",
  appId: "1:325714977055:web:81debc641f1281c9c6102a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);