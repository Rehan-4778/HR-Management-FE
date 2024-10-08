import React from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import {
  HiClock,
  HiHashtag,
  HiLocationMarker,
  HiMail,
  HiUser,
  HiUserCircle,
} from "react-icons/hi";
import { HiOutlineBuildingOffice2, HiPhone } from "react-icons/hi2";
import { IoPeopleSharp } from "react-icons/io5";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { useSelector } from "react-redux";

const InfoSidebar = () => {
  const userDetails = useSelector((state) => state?.employee?.userInfo);
  return (
    <div className="bg-gray-100 pt-10 w-full px-5 h-full">
      <div className="border-b py-4">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineBuildingOffice2 color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.workPhone || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <HiPhone color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.mobilePhone}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <HiMail color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.workEmail || userDetails?.homeEmail}
          </span>
        </div>
      </div>
      <div className="border-b py-4">
        <p className="text-sm font-medium text-green1 mb-1">Hire Date</p>
        {/* <p className="text-sm text-gray-500 font-medium">{}</p> */}
        {/* <p className="text-sm text-gray-600">2y - 11m - 16d</p> */}
        <p className="text-sm text-gray-600">
          {/* show like this 2y - 11m - 16d */}
          {userDetails?.hiringDate
            ? `${
                new Date().getFullYear() -
                new Date(userDetails?.hiringDate).getFullYear()
              }y - ${
                new Date().getMonth() -
                new Date(userDetails?.hiringDate).getMonth()
              }m - ${
                new Date().getDate() -
                new Date(userDetails?.hiringDate).getDate()
              }d`
            : "N/A"}
        </p>
      </div>
      <div className="border-b py-4">
        <div className="flex items-center gap-3 mb-3">
          <HiHashtag color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.employeeId}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <IoPeopleSharp color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.jobInformation?.length > 0
              ? userDetails?.jobInformation[0]?.department
              : "-"}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <VscTypeHierarchySub color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.jobInformation?.length > 0
              ? userDetails?.jobInformation[0]?.division
              : "-"}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <HiLocationMarker color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.jobInformation?.length > 0
              ? userDetails?.jobInformation[0]?.location
              : "-"}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <HiClock color="#777" size={18} />
          <span className="text-sm text-gray-600">
            {userDetails?.jobInformation?.length > 0
              ? new Date(userDetails?.jobInformation[0]?.effectiveDate)
                  .toLocaleTimeString()
                  .replace(/:\d+ /, " ") + " local time"
              : "-"}
          </span>
        </div>
      </div>
      <div className="py-4">
        <p className="text-sm font-medium text-green1 mb-2">Direct Reports</p>
        <div className="flex gap-2 mb-2">
          <HiUserCircle color="#777" size={20} />
          <p className="text-sm text-gray-500">Employee 2</p>
        </div>
        <div className="flex gap-2 mb-2">
          <HiUserCircle color="#777" size={20} />
          <p className="text-sm text-gray-500">Employee 2</p>
        </div>
        <div className="flex gap-2 mb-2">
          <HiUserCircle color="#777" size={20} />
          <p className="text-sm text-gray-500">Employee 2</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar;
