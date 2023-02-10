import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB-uLqCNEMkAwftqeLfk7OpwawQsgJEttM',
  authDomain: 'social-app-82418.firebaseapp.com',
  projectId: 'social-app-82418',
  storageBucket: 'social-app-82418.appspot.com',
  messagingSenderId: '501190226595',
  appId: '1:501190226595:web:0025f01e92ac7a12aa4516',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
export default app;
