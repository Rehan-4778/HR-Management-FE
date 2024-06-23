import React from "react";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import SigninPage from "./Pages/Authentication/SigninPage";
import NotFoundPage from "./Pages/NotFound/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<SigninPage />} />

        {/* Add route for not found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
