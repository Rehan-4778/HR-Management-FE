import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./DashboardNav.css";
import { useParams } from "react-router-dom";

const MyInfoNav = ({ user }) => {
  const { companyDomain, employeeId } = useParams();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`flex gap-3 ${isFixed ? "fixed_nav" : ""}`}>
      {isFixed && (
        <div className="flex justify-center items-center gap-2 me-auto">
          <img
            src={
              user?.image ||
              "https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png"
            }
            alt="User"
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
          <h5 className="text-lg font-medium">
            {user?.firstName + " " + user?.lastName}
          </h5>
        </div>
      )}

      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/personal`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ||
            window.location.pathname ===
              `/${companyDomain}/employee/${employeeId}`
              ? "nav-link-active"
              : "nav_link"
          }`
        }
      >
        Personal
      </NavLink>
      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/job`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Job
      </NavLink>
      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/time-log`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Clock In/Out
      </NavLink>
      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/time-off`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Time Off
      </NavLink>

      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/documents`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Documents
      </NavLink>

      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/assets`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Assets
      </NavLink>
      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/notes`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Notes
      </NavLink>

      {/* <NavLink
        to={`/${companyDomain}/employee/${employeeId}/onboarding`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Onboarding
      </NavLink>
      <NavLink
        to={`/${companyDomain}/employee/${employeeId}/offboarding`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : "nav_link"
          }`
        }
      >
        Offboarding
      </NavLink> */}
    </nav>
  );
};

export default MyInfoNav;
