import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    setDoc,
    doc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfELPPt-t6q_9uHfw6BU36lXruZSgJLgw",
  authDomain: "flame-d973f.firebaseapp.com",
  projectId: "flame-d973f",
  storageBucket: "flame-d973f.appspot.com",
  messagingSenderId: "789880946117",
  appId: "1:789880946117:web:2025284d99d517c234dfac"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'local',
                email: user.email,
                fuel: 1000,
                lastLogin: Date.now(),
                habits: {}
            });
        }
    }
    catch (err) {
        console.error(err);
    }
}

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        signInWithEmailAndPassword(auth, email, password);

    }
    catch (err) {
        console.error(err);
    }
}

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'local',
                email: user.email,
                fuel: 1000,
                lastLogin: Date.now(),
                habits: {}
            });
        }
    }
    catch (err) {
        console.error(err);
    }
}

export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset link send!');
    }
    catch (err) {
        console.error(err);
    }
}

export const logout = () => {
    signOut(auth);
}