import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { 
  getMessaging, 
  getToken as getMessagingToken, 
  onMessage 
} from "firebase/messaging";
import { Alert } from 'react-native';

// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const messaging = getMessaging(app);

// Request notification permissions
export const requestUserPermission = async () => {
  try {
    const status = await Notification.requestPermission();
    if (status === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
      Alert.alert("Notification permission is required for alerts.");
    }
  } catch (error) {
    console.error("Error requesting notification permissions:", error);
  }
};

// Fetch FCM token
export const getToken = async () => {
  try {
    const token = await getMessagingToken(messaging);
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error fetching FCM token:", error);
  }
};

// Notification Listener
export const notificationListener = (dispatch) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    Alert.alert("New Notification", payload.notification.body);
    dispatch({ type: "notifications/addNotification", payload });
  });

  return unsubscribe;
};

export { auth, db, messaging };
