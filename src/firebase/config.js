
import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
} from '@firebase/auth';
import { getStorage } from '@firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDtW478LIu5piSo6i5tdUvAAqwEHJqSzXk",
  authDomain: "zingmp3-app.firebaseapp.com",
  projectId: "zingmp3-app",
  storageBucket: "zingmp3-app.appspot.com",
  messagingSenderId: "306659035948",
  appId: "1:306659035948:web:2c3a57a3976ee9ad6aba89",
  measurementId: "G-SHDBYR4VLT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider(app);
const facebookProvider = new FacebookAuthProvider(app);
const githubAuthProvider = new GithubAuthProvider(app);

export { auth, googleProvider, facebookProvider, githubAuthProvider, storage };
export default db;