import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./auth/authSlice";
import { psychologistsReducer } from "./psychologists/slice";
import { favoritesReducer } from "./favorites/favoriteSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const favoritesConfig = {
  key: "favorites",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  users: usersReducer,
  psychologists: psychologistsReducer,
  favorites: persistReducer(favoritesConfig, favoritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
