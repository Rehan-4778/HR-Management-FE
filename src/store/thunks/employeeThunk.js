const BASE_URL = import.meta.env.VITE_SERVER_URL;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createEmployee = createAsyncThunk(
  "auth/addEmployee",
  async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/addEmployee`,
        data
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
