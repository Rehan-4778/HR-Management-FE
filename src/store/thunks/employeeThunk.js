import axios from "axios";
import { loadState } from "../../../utils/storageManager";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createEmployee = createAsyncThunk(
  "auth/addEmployee",
  async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/addEmployee`,
        data
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const sendOnboardingInvite = createAsyncThunk(
  "auth/sendOnboardingInvite",
  async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/onboard/sendOnboardingInvite`,
        data
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getCompanyEmployeeNames = createAsyncThunk(
  "employee/getCompanyEmployees",
  async ({ companyId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/employee/getCompanyEmployeesNames/${companyId}`,
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

export const getCompanyEmployeesList = createAsyncThunk(
  "employee/getCompanyEmployeesList",
  async ({ companyId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/employee/getCompanyEmployees/${companyId}`,
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

export const getEmployeeInfo = createAsyncThunk(
  "employee/getEmployeeInfo",
  async (data) => {
    const storedState = loadState("storedState");
    const { employeeId, companyId } = data;
    try {
      const response = await axios.get(
        // api/v1/employee/:employeeId/info?companyId=companyId
        `${BASE_URL}/api/v1/employee/${employeeId}/info?companyId=${companyId}`,
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

export const addEmployeeField = createAsyncThunk(
  "employee/addEmployeeField",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId, fieldName, fieldValue } = data;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/employee/${employeeId}`,
        { companyId, fieldName, fieldValue },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          "Content-Type": "application/json",
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteEmployeeField = createAsyncThunk(
  "employee/deleteEmployeeField",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId, fieldName, fieldId } = data;
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/employee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          data: { companyId, fieldName, fieldId },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateEmployeeField = createAsyncThunk(
  "employee/updateEmployeeField",
  async (data) => {
    const storedState = loadState("storedState");
    const { employeeId, companyId, fieldName, fieldId, fieldValue } = data;
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/employee/${employeeId}`,
        { companyId, fieldName, fieldId, fieldValue },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          "Content-Type": "application/json",
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updatePersonalInfo = createAsyncThunk(
  "employee/updatePersonalInfo",
  async (data) => {
    const storedState = loadState("storedState");
    const { employeeId, companyId, personalInfo, updateKey } = data;
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/employee/updatePersonalInfo/${employeeId}`,
        { companyId, personalInfo, updateKey },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          "Content-Type": "application/json",
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "employee/uploadProfilePicture",
  async (data) => {
    const storedState = loadState("storedState");
    const { employeeId, formData } = data;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/employee/${employeeId}/uploadProfilePicture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          "Content-Type": "multipart/form-data",
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getSignableDocuments = createAsyncThunk(
  "employee/getSignableDocuments",
  async (data) => {
    const storedState = loadState("storedState");
    const { employeeId, companyId } = data;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/employee/${companyId}/${employeeId}/files`,
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

// /:employeeId/requestSignature
export const requestSignature = createAsyncThunk(
  "employee/requestSignature",
  async (data) => {
    const storedState = loadState("storedState");
    const { companyId, employeeId, folderId, fileId, message } = data;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/employee/${employeeId}/requestSignature`,
        { companyId, folderId, fileId, message },
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          "Content-Type": "application/json",
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getNotifications = createAsyncThunk(
  "employee/getNotifications",
  async ({ companyId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/employee/${companyId}/getNotifications`,
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

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async ({ companyId, employeeId }) => {
    const storedState = loadState("storedState");
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/employee/deleteEmployee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
          },
          data: { companyId },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
