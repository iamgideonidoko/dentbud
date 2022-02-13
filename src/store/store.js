import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import chatReducer from './slice/chat.slice';

const reducers = combineReducers({
    chat: chatReducer
});

const persistConfig = {
    key: "dentbud_persist_store",
    storage: AsyncStorage,
    whitelist: []
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;