import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import chatReducer from './slice/chat.slice';
import authReducer from './slice/auth.slice';
import coreApi from './api/core.api';

export const rootReducer = combineReducers({
  chat: chatReducer,
  auth: authReducer,
  [coreApi.reducerPath]: coreApi.reducer,
});

const persistConfig = {
  key: 'dentbud_persist_store',
  storage: AsyncStorage,
  blacklist: [coreApi.reducerPath], // add reducers that should not be persisted here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

export default store;
