import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredCampers } from "./operations";

const initialState = {
  filteredCampers: [],
  isLoading: false,
  error: null,
  filters: null,
  total: 0,
};

const filteredSlice = createSlice({
  name: "filtered",
  initialState,

  reducers: {
    setFilters(state, action) {
      state.filteredCampers = []; // clean old values
      state.filters = action.payload;
    },

    resetFiltered(state) {
      state.filters = null;
      state.total = 0;
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

        const newFilteredCampers = action.payload.items.filter(
          (newCamper) =>
            !state.filteredCampers.some(
              (existing) => existing.id === newCamper.id
            )
        );

        state.filteredCampers = [
          ...state.filteredCampers,
          ...newFilteredCampers,
        ];
        state.total = action.payload.total;
      })
      .addCase(fetchFilteredCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFiltered } = filteredSlice.actions;
export const filteredReducer = filteredSlice.reducer;
