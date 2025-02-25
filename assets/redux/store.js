import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMigrate } from "redux-persist";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
import notificationReducer from "../redux/notifications/notificationSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  notifications: notificationReducer, // Ensure correct reducer name
});

const migrations = {
  0: (state) => ({
    ...state,
    notifications: { count: 0, messages: [] }, // Ensure correct structure
  }),
  1: (state) => state,
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage from react-native-async-storage
  version: 1, // Versioning for migrations
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable checks for AsyncStorage compatibility
    }),
});

export const persistor = persistStore(store);
