import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { employeeReducer } from "./slices/employeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export { store };
export * from "./thunks/authThunk";
export * from "./thunks/employeeThunk";
