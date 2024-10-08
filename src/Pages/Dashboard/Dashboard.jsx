import React, { useEffect } from "react";
import DashboardNav from "../../components/Navbars/DashboardNav";
import { Route, Routes } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import AddEmployee from "../AddEmployee/AddEmployee";
import Footer from "../../components/Footers/Footer";
import MyInfoPage from "../MyInfoPages/MyInfoPage";
import PeoplePage from "../PeoplePages/PeoplePage";
import RequestTimeOffPage from "../RequestTimeOff/RequestTimeOffPage";
import SettingsPage from "../SettingPages/SettingsPage";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyEmployeeFields, getCompanyEmployeeNames } from "../../store";
import RequestPage from "../RequestPages/RequestPage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );

  useEffect(() => {
    if (companyId) {
      getReportsToList();
      dispatch(getCompanyEmployeeFields({ companyId }));
    }
  }, [companyId]);

  const getReportsToList = async () => {
    const response = await dispatch(getCompanyEmployeeNames({ companyId }));
  };

  return (
    <div>
      <DashboardNav />
      <Routes>
        <Route path="/" element={<DashboardHomePage />} />
        <Route path="/home" element={<DashboardHomePage />} />
        <Route path="/employee/:employeeId/*" element={<MyInfoPage />} />
        <Route path="/employees/*" element={<PeoplePage />} />
        <Route path="/employees/new" element={<AddEmployee />} />
        <Route path="/request-time-off" element={<RequestTimeOffPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
        <Route path="/requests/*" element={<RequestPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Dashboard;
