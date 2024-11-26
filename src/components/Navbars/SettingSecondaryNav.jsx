import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

const SettingSecondaryNav = ({ heading, secondaryItems }) => {
  const location = useLocation();
  const { companyDomain } = useParams();

  function defaultActive() {
    switch (heading) {
      case "Account":
        return (
          location.pathname === `/${companyDomain}/settings/account` ||
          location.pathname === `/${companyDomain}/settings` ||
          location.pathname === `/${companyDomain}/settings/`
        );
      case "Access":
        return location.pathname === `/${companyDomain}/settings/access`;
      case "Approvals":
        return location.pathname === `/${companyDomain}/settings/approvals`;
      case "Employees Fields":
        return (
          location.pathname === `/${companyDomain}/settings/employees-fields`
        );
      case "Holidays":
        return location.pathname === `/${companyDomain}/settings/holidays`;
      case "Time Offs":
        return location.pathname === `/${companyDomain}/settings/time-offs`;
      default:
        return location.pathname === `/${companyDomain}/settings/account`;
    }
  }

  return (
    <nav className="p-4 w-[22%] border-r border-green1 min-h-screen">
      <h2 className="text-lg font-medium p-2">{heading}</h2>
      <ul>
        {secondaryItems.map((item, index) => {
          const itemPath = `${item.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <li key={item} className="p-2 mb-1">
              <NavLink
                to={itemPath}
                className={({ isActive }) => {
                  return isActive || (defaultActive() && index === 0)
                    ? "flex items-center text-green1 font-semibold rounded-sm cursor-pointer"
                    : " flex items-center text-gray-700 hover:text-green1 rounded-sm cursor-pointer";
                }}
              >
                {item}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SettingSecondaryNav;
