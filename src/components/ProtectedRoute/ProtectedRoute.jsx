import React from "react";
import { Navigate } from "react-router-dom";
import { loadState } from "../../../utils/storageManager";

const isAuthenticated = () => {
  const storedState = loadState("storedState");
  return storedState?.token;

  console.log(storedState);
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
