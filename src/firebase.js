import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const configProd = {
  apiKey: "AIzaSyC1OtTAblIfFQaafmrjFRnNdw62cZwj4ic",
  authDomain: "vuedowne.firebaseapp.com",
  projectId: "vuedowne",
  storageBucket: "vuedowne.firebasestorage.app",
  messagingSenderId: "890672733251",
  appId: "1:890672733251:web:037e50bbcbe7136329c8f6",
  measurementId: "G-XG8H0NT9MT"
};


function initialize(existingApp) {
  const firebaseApp = existingApp || initializeApp(configProd);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  return { firebaseApp, auth, firestore, storage };
}

export function getFirebase() {
  const existingApp = getApps().at(0);
  return initialize(existingApp);
}
