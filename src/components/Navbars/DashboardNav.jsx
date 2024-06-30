import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaBriefcase,
  FaFolder,
  FaSearch,
  FaBell,
  FaCog,
} from "react-icons/fa";
import "./DashboardNav.css";
import { useParams } from "react-router-dom";

const DashboardNav = () => {
  const { companyDomain } = useParams();
  return (
    <div className="flex items-center justify-between bg-gray-100 border-b-4 border-[#82af13] px-10">
      {/* Left Section */}
      <div className="flex items-center space-x-4 ">
        <div className="text-2xl font-bold">Logo</div>
        <nav className="flex">
          <NavLink
            to={`/${companyDomain}/home`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            Home
          </NavLink>
          <NavLink
            to={`/${companyDomain}/my-info`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            My Info
          </NavLink>
          <NavLink
            to={`/${companyDomain}/people`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            People
          </NavLink>
          <NavLink
            to={`/${companyDomain}/hiring`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            Hiring
          </NavLink>
          <NavLink
            to={`/${companyDomain}/reports`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            Reports
          </NavLink>
          <NavLink
            to={`/${companyDomain}/files`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            Files
          </NavLink>
        </nav>
      </div>
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="text-sm font-medium pl-10 pr-4 py-1.5 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
        </div>
        <div className="icon-button">
          <FaBell size={25} color="#999" />
        </div>
        <div className="icon-button">
          <FaCog size={25} color="#999" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
