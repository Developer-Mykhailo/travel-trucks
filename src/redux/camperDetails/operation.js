import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCamperById = createAsyncThunk(
  "camperDetails/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/campers/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
