import { createSlice } from "@reduxjs/toolkit";
import {
  getDocuments,
  createDocument,
  uploadFile,
  deleteFile,
} from "../thunks/documentsThunk";
import {
  loadState,
  saveState,
  clearState,
} from "../../../utils/storageManager";

const storedState = loadState("storedState");

const documentSlice = createSlice({
  name: "document",
  initialState: {
    isLoading: false,
    error: null,
    documents: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getDocuments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.documents = action.payload.data;
    });
    builder.addCase(getDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to fetch documents";
    });

    builder.addCase(createDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.documents = action.payload.data;
    });

    builder.addCase(createDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to create document";
    });

    builder.addCase(uploadFile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // state.documents = state.documents.map((doc) => {
      //   if (doc._id === action.payload.data._id) {
      //     return action.payload.data;
      //   }
      //   return doc;
      // });
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to upload file";
    });

    builder.addCase(deleteFile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFile.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteFile.rejected, (state) => {
      state.isLoading = false;
      state.error = action.error
        ? action.error.message
        : "Failed to delete file";
    });
  },
});

export const documentReducer = documentSlice.reducer;
