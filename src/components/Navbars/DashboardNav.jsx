import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import "./DashboardNav.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store";
import { FaInbox } from "react-icons/fa6";

const DashboardNav = () => {
  const { companyDomain } = useParams();
  const employeeId = useSelector(
    (state) => state?.auth?.selectedCompany?.profile?.employeeId
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const settingsIconRef = useRef(null);
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !settingsIconRef.current.contains(event.target)
    ) {
      setTimeout(() => setShowDropdown(false), 100); // delay to prevent conflict
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between bg-gray-100 border-b-4 border-[#82af13] px-10 fixed top-0 w-full z-10">
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
            to={`/${companyDomain}/employee/${employeeId}`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            My Info
          </NavLink>
          <NavLink
            to={`/${companyDomain}/employees/list`}
            className={({ isActive }) =>
              `nav-link ${isActive && "nav-link-active"} `
            }
          >
            People
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
      <div className="flex items-center space-x-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="text-sm font-medium pl-10 pr-4 py-1.5 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
        </div>
        <NavLink className="icon-button"
          to={`/${companyDomain}/requests`}
          
        >
          <FaInbox size={25} className=" text-tertiary" />
        </NavLink>
        <div
          className="icon-button relative"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          ref={settingsIconRef}
        >
          <FaCog size={25} className=" hover:text-tertiary" />
          {showDropdown && (
            <div
              className="absolute right-0 top-8 mt-2 w-40 bg-white rounded-br rounded-bl shadow-lg flex flex-col z-50"
              ref={dropdownRef}
            >
              <NavLink
                to={`/${companyDomain}/settings`}
                className="dropdown-link py-2 px-3 hover:bg-green1 hover:text-white"
              >
                Settings
              </NavLink>
              <NavLink
                to={`/${companyDomain}/employee/${employeeId}`}
                className="dropdown-link py-2 px-3 hover:bg-green1 hover:text-white"
              >
                My Profile
              </NavLink>
              <NavLink
                to={`/login/select-company`}
                className="dropdown-link py-2 px-3 hover:bg-green1 hover:text-white"
              >
                Switch Company
              </NavLink>
              <NavLink
                to={`/`}
                className="dropdown-link py-2 px-3 hover:bg-green1 hover:text-white"
                onClick={() => dispatch(logout())}
              >
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
