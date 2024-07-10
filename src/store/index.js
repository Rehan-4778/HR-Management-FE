import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { employeeReducer } from "./slices/employeeSlice";
import { onboardReducer } from "./slices/onboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    onboard: onboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export { store };
export * from "./thunks/authThunk";
export * from "./thunks/employeeThunk";
export * from "./thunks/onboardThunk";
