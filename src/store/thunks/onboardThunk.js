import { loadState } from "../../../utils/storageManager";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const onboardLogin = createAsyncThunk("onboard/login", async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/onboard/onboardLogin`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Invalid email or password");
    } else {
      throw error;
    }
  }
});

export const onboardSignup = createAsyncThunk(
  "onboard/signup",
  async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/onboard/onboardRegister`,
        data
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  }
);

export const checkOnboardExpiry = createAsyncThunk(
  "onboard/checkOnboardExpiry",
  async ({ onboardToken }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/onboard/checkOnboardExpiry/${onboardToken}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const acceptOnboardingInvite = createAsyncThunk(
  "onboard/acceptOnboardingInvite",
  async (data) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/onboard/acceptOnboardingInvite`,
        data,
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
