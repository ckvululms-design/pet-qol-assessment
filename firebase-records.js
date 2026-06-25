import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjL1wZkD6YTyc6QKB0Cozmyr2da43G0mo",
  authDomain: "gaze-cardiology-4e707.firebaseapp.com",
  projectId: "gaze-cardiology-4e707",
  storageBucket: "gaze-cardiology-4e707.firebasestorage.app",
  messagingSenderId: "615101140059",
  appId: "1:615101140059:web:11bb4fedbe7f687c4b837e",
  measurementId: "G-J6MD4YHYJ6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function ensureAnonymousUser() {
  if (auth.currentUser) return auth.currentUser;
  const credential = await signInAnonymously(auth);
  return credential.user;
}

async function submitQolRecord(payload) {
  const user = await ensureAnonymousUser();
  const record = {
    ...payload,
    anonymousUid: user.uid,
    firebaseProjectId: firebaseConfig.projectId,
    sourceSite: window.location.origin,
    pagePath: window.location.pathname,
    createdAt: serverTimestamp(),
    createdAtClient: new Date().toISOString(),
  };

  const ref = await addDoc(collection(db, "qolRecords"), record);
  return { id: ref.id, uid: user.uid };
}

window.qolFirebase = {
  projectId: firebaseConfig.projectId,
  collectionName: "qolRecords",
  submitQolRecord,
};

window.dispatchEvent(new CustomEvent("qol-firebase-ready"));
