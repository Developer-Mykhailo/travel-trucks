import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/slice";
import { filteredReducer } from "./filtered/slice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filtered: filteredReducer,
  },
});
