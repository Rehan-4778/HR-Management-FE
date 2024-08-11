import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SettingSecondaryNav from "../../../components/Navbars/SettingSecondaryNav";
import InformationUpdatesPage from "./InformationUpdatesPage";
import TimeOffRequestsPage from "./TimeOffRequestsPage";
import EmploymentStatusPage from "./EmploymentStatusPage";
import JobInformationPage from "./JobInformationPage";
import AssetsRequestPage from "./AssetsRequestPage";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../store/slices/loadingSlice";
import {
  getCompanyPermissions,
  updateCompanyPermissions,
} from "../../../store/thunks/settingThunk";

const secondaryNavItems = [
  "Information Updates",
  "Time Off Requests",
  "Employment Status",
  "Job Information",
  "Assets Request",
];

const AccessPage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );

  const employees = useSelector((state) => state?.employee?.reportsToList);

  const { isLoading, companyPermissions } = useSelector(
    (state) => state?.setting
  );

  const fetchPermissions = async () => {
    await dispatch(
      getCompanyPermissions({
        companyId,
      })
    );
  };

  const handleUpdatePermission = async ({
    permissionName,
    approver,
    specificPerson,
  }) => {
    // companyId, permissionName, approver, specificPerson
    const response = await dispatch(
      updateCompanyPermissions({
        companyId,
        permissionName,
        approver,
        specificPerson: specificPerson ? specificPerson : null,
      })
    );
    if (response.payload.success) {
      toast.success("Permission updated successfully");
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (isLoading) dispatch(showLoading());
    else dispatch(hideLoading());
  }, [isLoading]);

  return (
    <div className="flex">
      {!isLoading && (
        <>
          <SettingSecondaryNav
            heading="Access"
            secondaryItems={secondaryNavItems}
          />

          <div className="flex-1 p-4">
            <Routes>
              <Route
                path="*"
                element={
                  <InformationUpdatesPage
                    employees={employees}
                    permission={companyPermissions?.informationUpdates}
                    updatePermission={handleUpdatePermission}
                  />
                }
              />
              <Route
                path="/information-updates"
                element={
                  <InformationUpdatesPage
                    employees={employees}
                    permission={companyPermissions?.informationUpdates}
                    updatePermission={handleUpdatePermission}
                  />
                }
              />
              <Route
                path="/time-off-requests"
                element={
                  <TimeOffRequestsPage
                    employees={employees}
                    permission={companyPermissions?.timeOffRequests}
                    updatePermission={handleUpdatePermission}
                  />
                }
              />
              <Route
                path="/employment-status"
                element={
                  <EmploymentStatusPage
                    employees={employees}
                    permission={companyPermissions?.employmentStatus}
                    updatePermission={handleUpdatePermission}
                  />
                }
              />
              <Route
                path="/job-information"
                element={
                  <JobInformationPage
                    employees={employees}
                    permission={companyPermissions?.jobInformation}
                    updatePermission={handleUpdatePermission}
                  />
                }
              />

              <Route
                path="/assets-request"
                element={
                  <AssetsRequestPage
                    employees={employees}
                    permission={companyPermissions?.assetRequest}
                    updatePermission={handleUpdatePermission}
                  />
                }
              />
            </Routes>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default AccessPage;
