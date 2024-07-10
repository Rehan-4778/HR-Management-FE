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

const InfoSidebar = () => {
  return (
    <div className="bg-gray-100 pt-10 w-full px-5 h-full">
      <div className="border-b py-4">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineBuildingOffice2 color="#777" size={18} />
          <span className="text-sm text-gray-600">801-724-6600</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <HiPhone color="#777" size={18} />
          <span className="text-sm text-gray-600">801-724-6600</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <HiMail color="#777" size={18} />
          <span className="text-sm text-gray-600">abc@mail.com</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <BsLinkedin color="#777" size={18} />
          <BsFacebook color="#777" size={18} />
        </div>
      </div>
      <div className="border-b py-4">
        <p className="text-sm font-medium text-green1 mb-1">Hire Date</p>
        <p className="text-sm text-gray-500 font-medium">1234 South 1550</p>
        <p className="text-sm text-gray-600">2y - 11m - 16d</p>
      </div>
      <div className="border-b py-4">
        <div className="flex items-center gap-3 mb-3">
          <HiHashtag color="#777" size={18} />
          <span className="text-sm text-gray-600">5</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <IoPeopleSharp color="#777" size={18} />
          <span className="text-sm text-gray-600">Operations</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <VscTypeHierarchySub color="#777" size={18} />
          <span className="text-sm text-gray-600">North America</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <HiLocationMarker color="#777" size={18} />
          <span className="text-sm text-gray-600">Calefornia, America</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <HiClock color="#777" size={18} />
          <span className="text-sm text-gray-600">1:43 PM local time</span>
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
