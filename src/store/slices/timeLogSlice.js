import { createSlice } from "@reduxjs/toolkit";
import { uploadTimeLog, getWorkLog, getTimeLogs } from "../thunks/timeLogThunk";

const timeLogSlice = createSlice({
  name: "timeLog",
  initialState: {
    isLoading: false,
    error: null,
    timeLogs: [],
    timeLogsList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(uploadTimeLog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadTimeLog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // state.timeLogs = action.payload.data;
    });

    builder.addCase(uploadTimeLog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to upload time log";
    });

    builder.addCase(getWorkLog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWorkLog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.timeLogs = action.payload.data;
    });

    builder.addCase(getWorkLog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || "Failed to get work log";
    });

    builder.addCase(getTimeLogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTimeLogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.timeLogsList = action.payload.data;
    });
    builder.addCase(getTimeLogs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || "Failed to get work log";
    });
  },
});

export const timeLogReducer = timeLogSlice.reducer;
