import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardNav.css";
import { useParams } from "react-router-dom";

const MyInfoNav = () => {
  const { companyDomain } = useParams();
  return (
    <nav className="flex gap-3">
      <NavLink
        to={`/${companyDomain}/my-info/personal`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Personal
      </NavLink>
      <NavLink
        to={`/${companyDomain}/my-info/job`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Job
      </NavLink>
      <NavLink
        to={`/${companyDomain}/my-info/time-off`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Time Off
      </NavLink>
      <NavLink
        to={`/${companyDomain}/my-info/documents`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Documents
      </NavLink>
      {/* <NavLink
        to={`/${companyDomain}/my-info/benefits`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Benefits
      </NavLink> */}
      {/* <NavLink
        to="training"
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Training
      </NavLink> */}
      <NavLink
        to={`/${companyDomain}/my-info/assets`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Assets
      </NavLink>
      <NavLink
        to={`/${companyDomain}/my-info/notes`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Notes
      </NavLink>
      {/* <NavLink
        to="emergency"
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Emergency
      </NavLink> */}
      <NavLink
        to={`/${companyDomain}/my-info/onboarding`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Onboarding
      </NavLink>
      <NavLink
        to={`/${companyDomain}/my-info/offboarding`}
        className={({ isActive }) =>
          `p-2 min-w-16  rounded-tl-md rounded-tr-md ${
            isActive ? "nav-link-active" : ""
          }`
        }
      >
        Offboarding
      </NavLink>
    </nav>
  );
};

export default MyInfoNav;
