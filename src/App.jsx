<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======
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
import NavigateToHome from "./components/ProtectedRoute/NavigateToHome";
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
=======
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
        <Route
          path="/login"
          element={
            <NavigateToHome>
              <SigninPage />
            </NavigateToHome>
          }
        />
        <Route
          path="/signup"
          element={
            <NavigateToHome>
              <SignupPage />
            </NavigateToHome>
          }
        />
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
>>>>>>> Stashed changes
}

export default App
