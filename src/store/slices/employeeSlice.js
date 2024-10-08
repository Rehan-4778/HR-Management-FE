import { createSlice } from "@reduxjs/toolkit";
import {
  createEmployee,
  sendOnboardingInvite,
  getCompanyEmployeeNames,
  getCompanyEmployeesList,
  getEmployeeInfo,
  addEmployeeField,
  updateEmployeeField,
  deleteEmployeeField,
  updatePersonalInfo,
  uploadProfilePicture,
  getSignableDocuments,
  requestSignature,
  getNotifications,
} from "../thunks/employeeThunk";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    isLoading: false,
    error: null,
    employees: [],
    userInfo: {},
    signableDocuments: [],
    reportsToList: [],
    notifications: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyEmployeesList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCompanyEmployeesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.employees = action.payload.data;
    });
    builder.addCase(getCompanyEmployeesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to fetch employees";
    });

    builder.addCase(createEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.employees = [...state.employees, action.payload];
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(sendOnboardingInvite.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendOnboardingInvite.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(sendOnboardingInvite.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getCompanyEmployeeNames.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCompanyEmployeeNames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.reportsToList = action.payload.data;
    });
    builder.addCase(getCompanyEmployeeNames.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to fetch employees";
    });

    builder.addCase(getEmployeeInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEmployeeInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = action.payload.data;
    });
    builder.addCase(getEmployeeInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(addEmployeeField.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEmployeeField.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = action.payload.data;
    });
    builder.addCase(addEmployeeField.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    builder.addCase(deleteEmployeeField.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEmployeeField.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = action.payload.data;
    });
    builder.addCase(deleteEmployeeField.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    builder.addCase(updateEmployeeField.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateEmployeeField.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = action.payload.data;
    });
    builder.addCase(updateEmployeeField.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    builder.addCase(updatePersonalInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePersonalInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = action.payload.data;
    });
    builder.addCase(updatePersonalInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    builder.addCase(uploadProfilePicture.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadProfilePicture.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = action.payload.data;
    });
    builder.addCase(uploadProfilePicture.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    builder.addCase(getSignableDocuments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSignableDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.signableDocuments = action.payload.data;
    });
    builder.addCase(getSignableDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    builder.addCase(requestSignature.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestSignature.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(requestSignature.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });

    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.notifications = action.payload.data;
    });
    builder.addCase(getNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message;
    });
  },
});

export const employeeReducer = employeeSlice.reducer;
