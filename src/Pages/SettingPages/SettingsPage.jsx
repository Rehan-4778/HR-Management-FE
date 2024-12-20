// pages/SettingsPage.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SettingPrimaryNav from "../../components/Navbars/SettingPrimaryNav";
import AccountPage from "./AccountPages.jsx/AccountPage";
import AccessPage from "./AccessPages/AccessPage";
import { FaGear } from "react-icons/fa6";
import EmployeeFieldsPage from "./EmployeeFieldsPages/EmployeeFieldsPage";
import HolidaysPage from "./HolidaysPages/HolidaysPage";
import AnnouncementsPage from "./AnnouncementPages/AnnouncementsPage";
// import TimeOffsPage from "./TimeOffsPage";

const SettingsPage = () => {
  return (
    <div className="min-h-screen mt-16 max-w-7xl px-10 mx-auto">
      <div className="flex items-center">
        <FaGear size={22} className="text-green1" />
        <h1 className="text-2xl font-semibold p-4 text-green1">Settings</h1>
      </div>
      <div className="flex border-t-[1.5px] border-gray-200">
        <SettingPrimaryNav />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AccountPage />} />
            <Route path="/account/*" element={<AccountPage />} />
            <Route path="/access/*" element={<AccessPage />} />
            <Route path="employees-fields/*" element={<EmployeeFieldsPage />} />
            <Route path="holidays/*" element={<HolidaysPage />} />
            <Route path="announcements/*" element={<AnnouncementsPage />} />
            {/* <Route
              path="*"
              element={
                <div>
                  Select a section from the primary navigation to view details
                </div>
              }
            /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
