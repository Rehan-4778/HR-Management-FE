const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { loadState } from "../../../utils/storageManager";

import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, data);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Invalid email or password");
    } else {
      throw error;
    }
  }
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const selectCompany = createAsyncThunk(
  "auth/selectCompany",
  async (data) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/selectCompany`,
        data,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
