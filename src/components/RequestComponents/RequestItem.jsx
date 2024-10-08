// components/RequestItem.jsx
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const RequestItem = ({ request }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b py-3 hover:bg-gray-50 group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex gap-5 px-5 items-center">
        <img
          src="https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />

        <div className="w-full flex justify-between items-center">
          <div>
            <p className="font-medium text-black">{request.name}</p>
            <p className="text-[13px] text-gray-600">{request.date}</p>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="border-green1 border-[1.5px] text-green1 font-medium px-3 py-1 rounded-sm text-sm">
              Approve
            </button>
            <button className="border-gray-500 border-[1.5px] text-gray-700 font-medium px-3 py-1 rounded-sm text-sm">
              Deny
            </button>
            <div className="opacity-100 group-hover:opacity-0 transition-opacity">
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="mt-2">
          <p>{request.details}</p>
        </div>
      )}
    </div>
  );
};

export default RequestItem;
