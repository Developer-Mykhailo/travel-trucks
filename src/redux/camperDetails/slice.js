import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperById } from "./operation";

const camperDetailsSlice = createSlice({
  name: "camperDetails",
  initialState: {
    camper: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.camper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const camperDetailsReducer = camperDetailsSlice.reducer;
