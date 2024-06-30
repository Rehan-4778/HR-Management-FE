import React from "react";
import DashboardNav from "../../components/Navbars/DashboardNav";
import { Route, Routes } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import AddEmployee from "../AddEmployee/AddEmployee";

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />
      <Routes>
        <Route path="/home" element={<DashboardHomePage />} />

        {/* Route to add employee */}
        <Route path="/employees/new" element={<AddEmployee />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
