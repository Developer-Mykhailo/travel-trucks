import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/slice";
import { filteredReducer } from "./filtered/slice";
import { camperDetailsReducer } from "./camperDetails/slice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filtered: filteredReducer,
    camperDetails: camperDetailsReducer,
  },
});
