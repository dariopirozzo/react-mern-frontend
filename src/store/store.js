import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import loginSlice from './slices/loginSlice'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  };

  const rootReducer = combineReducers({
    user: loginSlice,
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer : persistedReducer
  },
})

export const persistor = persistStore(store);