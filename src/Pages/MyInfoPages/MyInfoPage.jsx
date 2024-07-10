import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyInfoHeader from "../../components/Headers/MyInfoHeader";
import PersonalPage from "./PersonalPage";
import InfoSidebar from "../../components/Sidebars/InfoSidebar";
import { Route, Routes } from "react-router-dom";
import JobPage from "./JobPage";
import DocumentsPage from "./DocumentsPage";

const MyInfoPage = () => {
  const { companyDomain } = useParams();
  const user = useSelector((state) => state?.auth?.user);
  return (
    <div className="w-full mt-16">
      <MyInfoHeader user={user} companyDomain={companyDomain} />
      <div className="flex px-10">
        <div className="w-[240px]">
          <InfoSidebar />
        </div>
        <div className="w-4/5 min-h-screen">
          {/* define routes here */}
          <Routes>
            <Route path="/" element={<PersonalPage />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/job" element={<JobPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            {/*  <Route path="/education" element={<EducationPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="/emergency" element={<EmergencyPage />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
