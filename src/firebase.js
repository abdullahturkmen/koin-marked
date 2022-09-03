import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import toast from "react-hot-toast";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const register = async (email, password) => {
   try{
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    return user
   }catch(e){
    toast.error(e.message)
   }
}

export const login = async (email, password) => {
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        return user
       }catch(e){
        toast.error(e.message)
       }
}


export const logout = async () => {
    try{
        await signOut(auth)
        return true
       }catch(e){
        toast.error(e.message)
       }
}

export {
    db,
    collection,
    getDocs
};
