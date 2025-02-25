import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { store, persistor } from "../assets/redux/store";
import { requestUserPermission, getToken, notificationListener } from "../services/firebase";
import AppNavigator from "./AppNavigator";

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

const MainApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setupNotifications = async () => {
      await requestUserPermission(); // Ask for notification permissions
      await getToken(); // Fetch the FCM token

      // Set up notification listener
      const unsubscribe = notificationListener(dispatch);

      // Cleanup function
      return () => unsubscribe();
    };

    setupNotifications();
  }, [dispatch]);

  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
};

export default Index;
