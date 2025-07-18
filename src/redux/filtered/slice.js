import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredCampers } from "./operations";

const initialState = {
  filteredCampers: [],
  isLoading: false,
  error: null,
  filters: null,
};

const filteredSlice = createSlice({
  name: "filtered",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filteredCampers = []; // clean old values
      state.filters = action.payload;
    },
    resetFilters(state) {
      state.filters = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        const newFilteredCampers = action.payload.filter(
          (newCamper) =>
            !state.filteredCampers.some(
              (existing) => existing.id === newCamper.id
            )
        );

        state.filteredCampers = [
          ...state.filteredCampers,
          ...newFilteredCampers,
        ];
      })
      .addCase(fetchFilteredCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters } = filteredSlice.actions;
export const filteredReducer = filteredSlice.reducer;
