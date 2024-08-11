// pages/EmployeeFieldsPage.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SettingSecondaryNav from "../../../components/Navbars/SettingSecondaryNav";
import DegreePage from "./DegreePage";
import DepartmentPage from "./DepartmentPage";
import JobTitlePage from "./JobTitlePage";
import VisaPage from "./VisaPage";
import DivisionPage from "./DivisionPage";
import EmploymentStatusPage from "./EmploymentStatusPage";
import AssetsCategoryPage from "./AssetsCategoryPage";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompanyEmployeeField,
  deleteCompanyEmployeeField,
  editCompanyEmployeeField,
  getCompanyEmployeeFields,
} from "../../../store";
import { toast } from "react-toastify";

const EmployeeFieldsPage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const employeeFieldsData = useSelector(
    (state) => state?.setting?.employeeFields
  );

  const secondaryNavItems = [
    "Degree",
    "Department",
    "Division",
    "Employment Status",
    "Job Title",
    "Visa",
    "Assets Category",
  ];

  // useEffect(() => {
  // dispatch(getCompanyEmployeeFields({ companyId }));
  // }, []);

  const handleAddCompanyEmployeeField = async (fieldName, fieldValue) => {
    const response = await dispatch(
      addCompanyEmployeeField({
        companyId,
        fieldName,
        fieldValue,
      })
    );

    if (response.payload.success) {
      // captilize fieldname
      toast.success(
        `${
          fieldName?.charAt(0).toUpperCase() + fieldName.slice(1)
        } added successfully`
      );
    }
  };

  const handleDeleteCompanyEmployeeField = async (fieldName, fieldId) => {
    const response = await dispatch(
      deleteCompanyEmployeeField({
        companyId,
        fieldName,
        fieldId,
      })
    );

    if (response.payload.success) {
      toast.success(
        `${
          fieldName?.charAt(0).toUpperCase() + fieldName.slice(1)
        } deleted successfully`
      );
    }
  };

  const handleEditCompanyEmployeeField = async (
    fieldName,
    fieldValue,
    fieldId
  ) => {
    const response = await dispatch(
      editCompanyEmployeeField({
        companyId,
        fieldName,
        fieldId,
        fieldValue,
      })
    );

    if (response.payload.success) {
      toast.success(
        `${
          fieldName?.charAt(0).toUpperCase() + fieldName.slice(1)
        } updated successfully`
      );
    }
  };

  return (
    <div className="flex">
      <SettingSecondaryNav
        heading="Employees Fields"
        secondaryItems={secondaryNavItems}
      />
      <div className="flex-1 p-4">
        <Routes>
          <Route
            path="/"
            element={
              <DegreePage
                list={employeeFieldsData?.degree}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
          <Route
            path="degree"
            element={
              <DegreePage
                list={employeeFieldsData?.degree}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
          <Route
            path="department"
            element={
              <DepartmentPage
                list={employeeFieldsData?.department}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
          <Route
            path="division"
            element={
              <DivisionPage
                list={employeeFieldsData?.division}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
          <Route
            path="employment-status"
            element={
              <EmploymentStatusPage
                list={employeeFieldsData?.employmentStatus}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
          <Route
            path="job-title"
            element={
              <JobTitlePage
                list={employeeFieldsData?.jobTitle}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
          <Route
            path="visa"
            element={
              <VisaPage
                list={employeeFieldsData?.visaType}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
          <Route
            path="assets-category"
            element={
              <AssetsCategoryPage
                list={employeeFieldsData?.assetCategory}
                onAddField={handleAddCompanyEmployeeField}
                onDelete={handleDeleteCompanyEmployeeField}
                onEdit={handleEditCompanyEmployeeField}
              />
            }
          />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeFieldsPage;
