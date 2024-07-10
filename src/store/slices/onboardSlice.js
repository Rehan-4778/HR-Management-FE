import { createSlice } from "@reduxjs/toolkit";
import {
  onboardLogin,
  onboardSignup,
  acceptOnboardingInvite,
  checkOnboardExpiry,
} from "../thunks/onboardThunk";
import { logout } from "../thunks/authThunk";
import { loadState, saveState } from "../../../utils/storageManager";

const storedState = loadState("storedState");

const onboardSlice = createSlice({
  name: "onboard",
  initialState: {
    isLoading: false,
    error: null,
    isAuthenticated: storedState ? storedState.isAuthenticated : false,
    user: storedState ? storedState.user : null,
    token: storedState ? storedState.token : null,
  },
  extraReducers: (builder) => {
    builder.addCase(onboardLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(onboardLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;

      saveState("storedState", {
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
      });
    });
    builder.addCase(onboardLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(onboardSignup.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(onboardSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      state.token = action.payload.token;
      state.user = action.payload.user;

      saveState("storedState", {
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
      });
    });
    builder.addCase(onboardSignup.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.error;
    });

    builder.addCase(checkOnboardExpiry.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkOnboardExpiry.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(checkOnboardExpiry.rejected, (state, action) => {
      console.log(action.error);
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(acceptOnboardingInvite.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(acceptOnboardingInvite.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(acceptOnboardingInvite.rejected, (state, action) => {
      console.log(action.error);
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      saveState("storedState", {
        token: null,
        isAuthenticated: false,
        user: null,
      });
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const onboardReducer = onboardSlice.reducer;
