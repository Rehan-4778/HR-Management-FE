// pages/RequestPage.jsx
import React from "react";
import RequestSidebar from "../../components/Sidebars/RequestSidebar";
import RequestContent from "../../components/RequestComponents/RequestContent";
import { FaInbox } from "react-icons/fa6";

const RequestPage = () => {
  return (
    <div className=" mt-16 px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <FaInbox className="text-3xl text-green1" />
        <h1 className="text-3xl font-semibold my-5 text-green1 ">Requests</h1>
      </div>
      <div className="flex border-t-[1.45px]">
        <RequestSidebar />
        <RequestContent />
      </div>
    </div>
  );
};

export default RequestPage;
