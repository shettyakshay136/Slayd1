import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import favoritesReducer from './activitySlice';
import mediaSlice from './mediaSlice';
import scrollReducer from './scrollySlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import similarProductsReducer from './similarProductsSlice';

const persistConfig = {
  key: 'auth', 
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, 
    favorites: favoritesReducer,
    media: mediaSlice,
    scroll: scrollReducer,
    similarProducts: similarProductsReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
