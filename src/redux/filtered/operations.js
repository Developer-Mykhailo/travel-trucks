import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilteredCampers = createAsyncThunk(
  "filtered/fetchFiltered",
  async ({ filters, page }, thunkAPI) => {
    try {
      const res = await axios.get("/campers", {
        params: {
          page,
          limit: 4,
          ...filters,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
