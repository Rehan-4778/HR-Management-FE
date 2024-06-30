import React from "react";
import { FaUserCircle, FaUserPlus, FaEdit } from "react-icons/fa";
import "./DashboardHomePage.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardHomePage = () => {
  const user = useSelector((state) => state?.auth?.user);

  return (
    <div className="dashboard-home-page bg-gradient-to-r from-green2 to-green3 p-8 text-white shadow-md mb-4">
      <div className="flex justify-between items-start h-full">
        <div className="flex items-center space-x-4">
          {/* <div className="logo bg-white text-green-600 rounded-full p-2"> */}
          <FaUserCircle size={40} />
          {/* </div> */}
          <div>
            <h2 className="text-2xl font-bold">
              {user.firstName + user.lastName}
            </h2>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link className="btn-outline" to="/algo/employees/new">
            <FaUserPlus className="mr-2" />
            New Employee
          </Link>
          <button className="btn-outline">
            <FaEdit className="mr-2" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
