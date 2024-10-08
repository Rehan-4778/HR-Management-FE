const BASE_URL = import.meta.env.VITE_SERVER_URL;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadState } from "../../../utils/storageManager";

export const getDocuments = createAsyncThunk(
  "documents/getDocuments",
  async (data) => {
    const { employeeId, companyId } = data;
    try {
      const storedState = loadState("storedState");
      const response = await axios.get(
        `${BASE_URL}/api/v1/employee/${employeeId}/${companyId}/folders`,
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

export const createDocument = createAsyncThunk(
  "documents/createDocument",
  async (data) => {
    const { name, description, companyId, employeeId } = data;
    try {
      const storedState = loadState("storedState");
      const response = await axios.post(
        `${BASE_URL}/api/v1/employee/${employeeId}/folders`,
        { name, description, companyId },
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

export const uploadFile = createAsyncThunk(
  "documents/uploadFile",
  async (data) => {
    const storedState = loadState("storedState");
    const { formData, employeeId, folderId } = data;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/employee/${employeeId}/folders/${folderId}/files`,
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

export const deleteFile = createAsyncThunk(
  "documents/deleteFile",
  async (data) => {
    const storedState = loadState("storedState");
    console.log(storedState);
    const { companyId, employeeId, folderId, fileId } = data;
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/employee/${employeeId}/folders/${folderId}/files/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${storedState.token}`,
            "Content-Type": "application/json",
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
