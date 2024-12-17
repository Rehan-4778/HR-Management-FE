import { loadState } from "../../../utils/storageManager";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const requestTimeOff = createAsyncThunk(
  "timeOff/requestTimeOff",
  async (data) => {
    const storedState = loadState("storedState");
    const {
      companyId,
      employeeId,
      leaveTypeId,
      startDate,
      endDate,
      dayHours,
      note,
    } = data;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/timeOff/${employeeId}/request-time-off`,
        {
          companyId,
          leaveTypeId,
          startDate,
          endDate,
          dayHours,
          note,
        },
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

export const deleteTimeOffRequest = createAsyncThunk(
  "timeOff/deleteTimeOffRequest",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId, requestId } = data;
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/timeOff/${employeeId}/delete-time-off/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          data: { companyId },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getTimeOffDetails = createAsyncThunk(
  "timeOff/getTimeOffDetails",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId } = data;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/timeOff/${companyId}/${employeeId}/get-time-off-details`,
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

export const getTimeOffRequests = createAsyncThunk(
  "timeOff/getTimeOffRequests",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId } = data;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/timeOff/${companyId}/${employeeId}/get-time-off-requests`,
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
