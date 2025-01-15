import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import notificationReducer from '../redux/notifications/notificationSlice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the correct storage wrapper for React Native
import { createMigrate } from 'redux-persist';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  notification: notificationReducer,
});

const migrations = {
  0: (state) => {
    // Migration to clear old state or modify as needed
    return {
      ...state,
      notification: [],
    };
  },
  1: (state) => {
    // Migration for new state modifications
    return state;
  },
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage from react-native-async-storage
  version: 1, // Use versions for state migration
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this if necessary for AsyncStorage
    }),
});

export const persistor = persistStore(store);
