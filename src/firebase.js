// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUEzoXl4xys51aweLExJ5MvKNj3vQ7F2E",
  authDomain: "bboyo-real-estate.firebaseapp.com",
  projectId: "bboyo-real-estate",
  storageBucket: "bboyo-real-estate.appspot.com",
  messagingSenderId: "774502937147",
  appId: "1:774502937147:web:2f8e2e4dcfb03ba19d621e",
  measurementId: "G-G3YWKCX1QK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const generateToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, {
                vapidKey: "BNhYqBpyWgEmjd34300HwY07QrV-CizKrl0cAtCjVJlgTXPTOP2wsQmNKZLMxlmlonMoec5XFX8FItP6mWUeWBQ"
            });
            return token;
        } else {
            // TOAST_WARNING('Notification permission denied');
            return '0';
        }
    } catch (error) {
        // TOAST_WARNING('Notification permission denied');
        return '0';
    }
};