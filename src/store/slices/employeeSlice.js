import { createSlice } from "@reduxjs/toolkit";
import { createEmployee } from "../thunks/employeeThunk";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    isLoading: false,
    error: null,
    employees: [],
  },
  extraReducers: (builder) => {
    builder.addCase(createEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.employees = action.payload;
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const employeeReducer = employeeSlice.reducer;
