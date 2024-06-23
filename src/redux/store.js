// Налаштовуємо store
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactSlice } from './contactSlice';
import { filterSlice } from './filterSlice';

// Комбінуємо редусери для LocalStorage, всі нові редусери сюди
const rootReducer = combineReducers({
  contacts: contactSlice.reducer,
  filter: filterSlice.reducer,
});

// Налаштовуємо LocalStorage
const persistConfig = {
  key: 'contacts',
  storage,
};

// Персистуємо редусери
export const persistedReducer = persistReducer(persistConfig, rootReducer);

// Створюємо store
export const store = configureStore({
  // Добавляємо персистовані редусери до стору
  reducer: persistedReducer,

  //Добавляємо виключеня для ігнору службових функцій персиста
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

// Стоворюємо і експоруємо persistor
export const persistor = persistStore(store);
