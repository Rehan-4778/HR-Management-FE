import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { employeeReducer } from "./slices/employeeSlice";
import { onboardReducer } from "./slices/onboardSlice";
import { documentReducer } from "./slices/documentSlice";
import { timeLogReducer } from "./slices/timeLogSlice";
import { timeOffReducer } from "./slices/timeOffSlice";
import { settingReducer } from "./slices/settingSlice";
import loadingReducer from "./slices/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    onboard: onboardReducer,
    document: documentReducer,
    loading: loadingReducer,
    timeLog: timeLogReducer,
    timeOff: timeOffReducer,
    setting: settingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export { store };
export * from "./thunks/authThunk";
export * from "./thunks/employeeThunk";
export * from "./thunks/onboardThunk";
export * from "./thunks/documentsThunk";
export * from "./thunks/timeLogThunk";
export * from "./thunks/timeOffThunk";
export * from "./thunks/settingThunk";
