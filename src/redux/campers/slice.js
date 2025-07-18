import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const initialState = {
  campers: [],
  isLoading: false,
  error: null,
  total: 0,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,

  reducers: {
    resetCampers(state) {
      state.campers = [];
      state.total = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        const newCampers = action.payload.items.filter(
          (newCamper) =>
            !state.campers.some((existing) => existing.id === newCamper.id)
        );
        state.campers = [...state.campers, ...newCampers];
        state.total = action.payload.total;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
