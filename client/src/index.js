import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import authReducer from './state/authSlice';
import dataReducer from './state/dataSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: 'user', storage };
const sessionConfig = { key: 'data', storage:storageSession };

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedDataReducer = persistReducer(sessionConfig, dataReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        data: persistedDataReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
              <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>
);
