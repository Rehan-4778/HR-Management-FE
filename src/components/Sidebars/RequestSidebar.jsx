// pages/RequestSidebar.jsx
import React from "react";
import { FaPenNib } from "react-icons/fa";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Approvals",
    icon: <FaThumbsUp size={16} className="text-green1 mr-2" />,
    subItems: [
      "Time Off Requests",
      "Information Updates",
      "Asset Request",
      "Compensation",
      "Employment Status",
      "Job Information",
    ],
  },
  {
    name: "Signatures",
    count: 4,
    icon: <FaPenNib size={16} className="text-green1 mr-2" />,
  },
  {
    name: "Completed",
    icon: <FaPenNib size={16} className="text-green1 mr-2" />,
  },
];

const RequestSidebar = () => {
  return (
    <div className="w-64 p-4 bg-gray-100">
      <ul>
        {navItems.map((item, idx) => (
          <li key={idx} className="mb-2">
            <NavLink
              to={`/${item.name.toLowerCase().replace(" ", "-")}`}
              className="flex items-center font-medium"
            >
              {item.icon}
              <span className="font-medium text-green1">{item.name}</span>
              {item.count && (
                <span className="px-2 text-gray-500">({item.count})</span>
              )}
            </NavLink>
            {item.subItems && (
              <ul className="ml-8 mt-2">
                {item.subItems.map((subItem, subIdx) => (
                  <li key={subIdx} className="mb-2">
                    <NavLink
                      to={`/${subItem.toLowerCase().replace(" ", "-")}`}
                      className="text-sm text-gray-600 text-medium"
                    >
                      {subItem}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestSidebar;
