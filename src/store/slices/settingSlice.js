import { createSlice } from "@reduxjs/toolkit";
import {
  getCompanyEmployeeFields,
  addCompanyEmployeeField,
  deleteCompanyEmployeeField,
  editCompanyEmployeeField,
  getCompanyInfo,
  updateCompanyInfo,
  getCompanyPermissions,
  updateCompanyPermissions,
  getHolidays,
} from "../thunks/settingThunk";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    isLoading: false,
    error: null,
    employeeFields: {},
    companyInfo: {},
    companyPermissions: {},
    holidays: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCompanyEmployeeFields.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompanyEmployeeFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeFields = action.payload.data;
      })
      .addCase(getCompanyEmployeeFields.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCompanyEmployeeField.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCompanyEmployeeField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeFields = action.payload.data;
      })
      .addCase(addCompanyEmployeeField.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteCompanyEmployeeField.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCompanyEmployeeField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeFields = action.payload.data;
      })
      .addCase(deleteCompanyEmployeeField.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(editCompanyEmployeeField.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCompanyEmployeeField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeFields = action.payload.data;
      })
      .addCase(editCompanyEmployeeField.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getCompanyInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompanyInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyInfo = action.payload.data;
      })
      .addCase(getCompanyInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCompanyInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.companyInfo = action.payload.data;
      })
      .addCase(updateCompanyInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getCompanyPermissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompanyPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyPermissions = action.payload.data;
      })
      .addCase(getCompanyPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCompanyPermissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCompanyPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyPermissions = action.payload.data;
      })
      .addCase(updateCompanyPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getHolidays.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.holidays = action.payload.data;
      })
      .addCase(getHolidays.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const settingReducer = settingSlice.reducer;
