import { loadState } from "../../../utils/storageManager";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadTimeLog = createAsyncThunk(
  "timeLog/uploadTimeLog",
  async (data) => {
    const storedState = loadState("storedState");
    const { action, companyId, employeeId } = data;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/timeLog/${employeeId}/updateTimeLog`,
        { action, companyId },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getWorkLog = createAsyncThunk(
  "timeLog/getWorkLog",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId } = data;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/timeLog/${companyId}/${employeeId}/getWorkLog`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getTimeLogs = createAsyncThunk(
  "timeLog/getTimeLogs",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId } = data;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/timeLog/${companyId}/${employeeId}/getTimeLogs`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
