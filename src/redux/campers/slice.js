import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const initialState = {
  campers: [],
  isLoading: false,
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        const newCampers = action.payload.filter(
          (newCamper) =>
            !state.campers.some((existing) => existing.id === newCamper.id)
        );
        state.campers = [...state.campers, ...newCampers];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const campersReducer = campersSlice.reducer;
