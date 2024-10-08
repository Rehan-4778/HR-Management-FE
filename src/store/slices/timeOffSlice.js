import { createSlice } from "@reduxjs/toolkit";
import {
  requestTimeOff,
  getTimeOffDetails,
  getTimeOffRequests,
} from "../thunks/timeOffThunk";

const timeOffSlice = createSlice({
  name: "timeOff",
  initialState: {
    isLoading: false,
    error: null,
    timeOffDetails: [],
    timeOffRequestHistory: [],
  },

  extraReducers: (builder) => {
    builder.addCase(requestTimeOff.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestTimeOff.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // state.timeOffDetails = action.payload.data;
    });

    builder.addCase(requestTimeOff.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to request time off";
    });

    builder.addCase(getTimeOffDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTimeOffDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.timeOffDetails = action.payload.data;
    });

    builder.addCase(getTimeOffDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || "Failed to get time off details";
    });

    builder.addCase(getTimeOffRequests.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTimeOffRequests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.timeOffRequestHistory = action.payload.data;
    });
    builder.addCase(getTimeOffRequests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || "Failed to get time off requests";
    });
  },
});

export const timeOffReducer = timeOffSlice.reducer;
