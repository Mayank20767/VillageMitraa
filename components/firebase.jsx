import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyBLkJ9syZwIvHgQaBt3JmgIeutrSnQEapE',
  authDomain: 'villagemitra-3cd50.firebaseapp.com',
  databaseURL: 'https://villagemitra-3cd50.firebaseio.com',
  projectId: 'villagemitra-3cd50',
  storageBucket: 'villagemitra-3cd50.appspot.com',
  messagingSenderId: '1002621226610',
  appId: '1:1002621226610:android:1fb2fcd38fd0656c987ceb',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };