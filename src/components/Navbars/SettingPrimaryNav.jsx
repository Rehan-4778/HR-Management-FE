// components/Navbars/SettingPrimaryNav.jsx
import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  FaCog,
  FaUsers,
  FaClipboardList,
  FaCalendarAlt,
  FaUserCheck,
} from "react-icons/fa";

const SettingPrimaryNav = () => {
  const location = useLocation();
  const { companyDomain } = useParams();
  const defaultActive = location.pathname === `/${companyDomain}/settings`;

  const primarySections = [
    {
      name: "Account",
      icon: <FaCog className="text-gray-600" size={18} />,
      activeIcon: <FaCog className="text-white" size={18} />,
    },
    {
      name: "Access",
      icon: <FaUsers className="text-gray-600" size={18} />,
      activeIcon: <FaUsers className="text-white" size={18} />,
    },
    // {
    //   name: "Approvals",
    //   icon: <FaClipboardList className="text-gray-600" size={18} />,
    //   activeIcon: <FaClipboardList className="text-white" size={18} />,
    // },
    {
      name: "Employees Fields",
      icon: <FaUserCheck className="text-gray-600" size={18} />,
      activeIcon: <FaUserCheck className="text-white" size={18} />,
    },
    {
      name: "Holidays",
      icon: <FaCalendarAlt className="text-gray-600" size={18} />,
      activeIcon: <FaCalendarAlt className="text-white" size={18} />,
    },
    {
      name: "Time Offs",
      icon: <FaCalendarAlt className="text-gray-600" size={18} />,
      activeIcon: <FaCalendarAlt className="text-white" size={18} />,
    },
  ];

  return (
    <nav className="bg-gray-100 py-4 px-3 w-1/5 min-h-screen">
      <ul>
        {primarySections.map((section) => (
          <li key={section.name} className="mb-3">
            <NavLink
              to={`${section.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                isActive || (defaultActive && section.name === "Account")
                  ? "flex items-center gap-2 p-2 text-white bg-green1 cursor-pointer rounded-sm"
                  : "flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 cursor-pointer rounded-sm"
              }
            >
              {({ isActive }) => (
                <>
                  {isActive || (defaultActive && section.name === "Account")
                    ? section.activeIcon
                    : section.icon}
                  <span>{section.name}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingPrimaryNav;
