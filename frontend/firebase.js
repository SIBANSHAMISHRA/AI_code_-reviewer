import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "ai-code-reviewer-605b0.firebaseapp.com",
  projectId: "ai-code-reviewer-605b0",
  storageBucket: "ai-code-reviewer-605b0.firebasestorage.app",
  messagingSenderId: "855365570971",
  appId: "1:855365570971:web:37237e812e04eb871f913e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
