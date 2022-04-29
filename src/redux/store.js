import { combineReducers, configureStore } from "@reduxjs/toolkit";
import posts from "./postsRedux";
import users from "./usersRedux";

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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const rootReducer = combineReducers({ users });

const persistedReducer = persistReducer(persistConfig, users);

export const store = configureStore({
  reducer: { user: persistedReducer, posts },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
