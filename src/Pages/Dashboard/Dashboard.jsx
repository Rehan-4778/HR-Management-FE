import React from "react";
import DashboardNav from "../../components/Navbars/DashboardNav";
import { Route, Routes } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import AddEmployee from "../AddEmployee/AddEmployee";
import Footer from "../../components/Footers/Footer";
import MyInfoPage from "../MyInfoPages/MyInfoPage";
import PeoplePage from "../PeoplePages/PeoplePage";

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />
      <Routes>
        <Route path="/" element={<DashboardHomePage />} />
        <Route path="/home" element={<DashboardHomePage />} />
        <Route path="/my-info/*" element={<MyInfoPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/employees/new" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Dashboard;
