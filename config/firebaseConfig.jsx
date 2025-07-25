// Import the functions you need from the SDKs
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFMTs9o7ifkJWELC5Qg8hErJDbwA4HHEk",
    authDomain: "coffee-shop-e8d5f.firebaseapp.com",
    projectId: "coffee-shop-e8d5f",
    storageBucket: "coffee-shop-e8d5f.firebasestorage.app",
    messagingSenderId: "587158868908",
    appId: "1:587158868908:web:5f775fe490c4f10fb86009",
    measurementId: "G-RXGSC3KP19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
let analytics = null;
try {
    analytics = getAnalytics(app);
} catch (error) {
    // Analytics might not be available in certain environments
    console.log("Analytics initialization skipped");
}
export { analytics };

export default { auth, db, storage, analytics };