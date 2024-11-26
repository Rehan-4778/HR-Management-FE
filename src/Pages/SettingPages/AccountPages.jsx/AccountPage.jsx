// pages/AccountPage.jsx
import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SettingSecondaryNav from "../../../components/Navbars/SettingSecondaryNav";
import CompanyInfoPage from "./CompanyInfoPage";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo } from "../../../store";
import { hideLoading, showLoading } from "../../../store/slices/loadingSlice";
import CompanyEmployees from "./CompanyEmployees";

const secondaryNavItems = ["Company Info", "Employees"];

const AccountPage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );

  const { isLoading } = useSelector((state) => state?.setting);

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [isLoading]);

  const fetchCompanyInfo = async () => {
    try {
      dispatch(showLoading());
      await dispatch(
        getCompanyInfo({
          companyId,
        })
      );
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchCompanyInfo();
    }
  }, []);

  return (
    <div className="flex">
      {!isLoading && (
        <>
          <SettingSecondaryNav
            heading="Account"
            secondaryItems={secondaryNavItems}
          />

          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<CompanyInfoPage />} />
              <Route path="/company-info" element={<CompanyInfoPage />} />
              <Route path="/employees" element={<CompanyEmployees />} />
            </Routes>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default AccountPage;
