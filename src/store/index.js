import { combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/authSlice';
import { categoryApi } from './features/categorySlice';
import { dashApi } from './features/dashSlice';
import promotionReducer from './features/promotionSlice';

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_ENCRYPT_KEY,
  onError: (error) => {
    console.error('Error while encrypting', error);
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  promotion: promotionReducer,
  [dashApi.reducerPath]: dashApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(dashApi.middleware, categoryApi.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
