import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/slice";
import { filteredReducer } from "./filtered/slice";
import { camperDetailsReducer } from "./camperDetails/slice";

import storage from "redux-persist/lib/storage";
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

const persistedfilteredReducer = persistReducer(
  {
    key: "filtersQuery",
    storage,
    // whitelist: "filters",
  },
  filteredReducer
);

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filtered: persistedfilteredReducer,
    camperDetails: camperDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
