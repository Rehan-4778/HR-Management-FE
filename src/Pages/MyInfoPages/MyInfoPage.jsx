import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyInfoHeader from "../../components/Headers/MyInfoHeader";
import PersonalPage from "./PersonalPage";
import InfoSidebar from "../../components/Sidebars/InfoSidebar";
import { Route, Routes } from "react-router-dom";
import JobPage from "./JobPage";
import DocumentsPage from "./DocumentsPage";
import AssetsPage from "./AssetsPage";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeInfo } from "../../store";
import FilesPage from "./FilesPage";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";
import TimeOffPage from "./TimeOffPage";
import ClockInOutPage from "./ClockInOutPage";

const MyInfoPage = () => {
  const dispatch = useDispatch();
  const { companyDomain, employeeId } = useParams();

  const reportsToList = useSelector((state) => state?.employee?.reportsToList);
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const [editedImage, setEditedImage] = useState(null);

  const getUserInfo = async () => {
    try {
      dispatch(showLoading());
      await dispatch(
        getEmployeeInfo({
          employeeId,
          companyId,
        })
      );
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [companyDomain, employeeId]);

  return (
    <div className="w-full mt-16">
      <MyInfoHeader
        companyDomain={companyDomain}
        onEditImage={setEditedImage}
      />
      <div className="flex px-10">
        <div className="w-[240px]">
          <InfoSidebar />
        </div>
        <div className="w-4/5 min-h-screen">
          {/* define routes here */}
          <Routes>
            <Route path="/" element={<PersonalPage newImage={editedImage} />} />
            <Route
              path="/personal"
              element={<PersonalPage newImage={editedImage} />}
            />
            <Route
              path="/job"
              element={<JobPage reportsToList={reportsToList} />}
            />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/documents/:folderId" element={<FilesPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/time-log" element={<ClockInOutPage />} />
            <Route path="/time-off" element={<TimeOffPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
