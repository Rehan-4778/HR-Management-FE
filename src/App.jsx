import React from "react";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import SigninPage from "./Pages/Authentication/SigninPage";
import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import SignupPage from "./Pages/Authentication/SignupPage";
import OnboardLogin from "./Pages/OnboardFlow/OnboardLogin";
import OnboardSignupPage from "./Pages/OnboardFlow/OnboardSignup";
import SelectCompanyPage from "./Pages/Authentication/SelectCompanyPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import OnboardPage from "./Pages/OnboardFlow/OnboardPage";
import Loader from "./components/Loaders/Loader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ForgotPasswordPage from "./Pages/Authentication/ForgetPassword";
import ResetPasswordPage from "./Pages/Authentication/ResetPassword";

function App() {
  return (
    <div className="App">
      <Loader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        limit={1}
      />
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/login/select-company"
          element={
            <ProtectedRoute>
              <SelectCompanyPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<HomePage />} />
        <Route path="/onboard/:onboardToken" element={<OnboardPage />} />
        <Route path="/onboard/:onboardToken/login" element={<OnboardLogin />} />
        <Route
          path="/onboard/:onboardToken/signup"
          element={<OnboardSignupPage />}
        />

        {/* Dashboard Routes */}
        <Route
          path="/:companyDomain/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Add route for not found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
