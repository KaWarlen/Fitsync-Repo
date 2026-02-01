import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Substitua os valores abaixo pelos dados do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCCqVwnfHyE0D0Tc9aG76G_QkKTZO-T2fk",
  authDomain: "fitsync-beta00.firebaseapp.com",
  projectId: "fitsync-beta00",
  storageBucket: "fitsync-beta00.firebasestorage.app",
  messagingSenderId: "233114135636",
  appId: "1:233114135636:web:782167fa69f56a5a7e91c1",
  measurementId: "G-LBYH0P9DD9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Uso: importe `auth` e `db` onde precisar (ex.: `import { auth, db } from './src/firebase'`)
