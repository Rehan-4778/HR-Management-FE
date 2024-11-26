import axios from "axios";
import { loadState } from "../../../utils/storageManager";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCompanyEmployeeFields = createAsyncThunk(
  "setting/getCompanyEmployeeFields",
  async ({ companyId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/setting/companyEmployeeFields/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addCompanyEmployeeField = createAsyncThunk(
  "setting/addCompanyEmployeeField",
  async ({ companyId, fieldName, fieldValue }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/setting/companyEmployeeFields/${companyId}`,
        {
          fieldName,
          fieldValue,
        },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const editCompanyEmployeeField = createAsyncThunk(
  "setting/editCompanyEmployeeField",
  async ({ companyId, fieldName, fieldId, fieldValue }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/setting/companyEmployeeFields/${companyId}`,
        {
          fieldName,
          fieldId,
          fieldValue,
        },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteCompanyEmployeeField = createAsyncThunk(
  "setting/deleteCompanyEmployeeField",
  async ({ companyId, fieldName, fieldId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/setting/companyEmployeeFields/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          data: {
            fieldName,
            fieldId,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getCompanyInfo = createAsyncThunk(
  "setting/getCompanyInfo",
  async ({ companyId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/setting/companyInfo/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateCompanyInfo = createAsyncThunk(
  "setting/updateCompanyInfo",
  async ({ companyId, formData }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/setting/companyInfo/${companyId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getCompanyPermissions = createAsyncThunk(
  "setting/getCompanyPermissions",
  async ({ companyId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/setting/${companyId}/permissions`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateCompanyPermissions = createAsyncThunk(
  "setting/updateCompanyPermissions",
  async ({ companyId, permissionName, approver, specificPerson }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/setting/${companyId}/permissions`,
        { permissionName, approver, specificPerson },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
