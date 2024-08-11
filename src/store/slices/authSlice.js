import { createSlice } from "@reduxjs/toolkit";
import { login, signup, selectCompany, logout } from "../thunks/authThunk";
import { updateCompanyInfo } from "../thunks/settingThunk";
import {
  loadState,
  saveState,
  clearState,
} from "../../../utils/storageManager";

const storedState = loadState("storedState");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    isAuthenticated: storedState ? storedState.isAuthenticated : false,
    user: storedState ? storedState.user : null,
    token: storedState ? storedState.token : null,
    companies: storedState ? storedState.companies : [],
    selectedCompany: storedState ? storedState.selectedCompany : null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.companies = action.payload.companies;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      saveState("storedState", {
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        companies: action.payload.companies,
      });
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.error.message;
    });

    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.companies = action.payload.companies;

      saveState("storedState", {
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        companies: action.payload.companies,
      });
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.error;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.companies = [];
      state.selectedCompany = null;

      clearState("storedState");
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action.error);
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(selectCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(selectCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedCompany = action.payload.company;

      saveState("storedState", {
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        companies: state.companies,
        selectedCompany: action.payload.company,
      });
    });
    builder.addCase(selectCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(updateCompanyInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCompanyInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      state.selectedCompany = {
        ...state.selectedCompany,
        company: { ...action.payload.data.company },
      };
      state.companies = state.companies.map((company) =>
        company._id === action.payload.data.company._id
          ? action.payload.data.company
          : company
      );

      saveState("storedState", {
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        companies: state.companies,
        selectedCompany: action.payload.data.company,
      });
    });
    builder.addCase(updateCompanyInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const authReducer = authSlice.reducer;
