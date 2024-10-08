import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeTable = ({ data }) => {
  const navigate = useNavigate();
  const { companyDomain } = useParams();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-700 text-[15px]">
          <tr>
            <th className="py-2 font-semibold text-left ps-3">
              Employee Photo
            </th>
            <th className="py-2 font-semibold text-left">Employee #</th>
            <th className="py-2 font-semibold text-left">
              Last Name, First Name
            </th>
            <th className="py-2 font-semibold text-left">Job Title</th>
            <th className="py-2 font-semibold text-left">Location</th>
            <th className="py-2 font-semibold text-left">Employment Status</th>
            <th className="py-2 font-semibold text-left pe-3">Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((employee, index) => (
            <tr key={index} className="text-left border-b border-gray-200">
              <td className="py-3 ps-3">
                <img
                  src={
                    employee?.image ||
                    "https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png"
                  }
                  alt="Employee"
                  className="w-20 h-20 rounded-full"
                />
              </td>
              <td className="py-2">{employee?.employeeId}</td>
              <td
                className="py-2 hover:underline text-blue-600 cursor-pointer"
                onClick={() =>
                  // employee?.employeeId === "2"
                  //   ? toast.error(
                  //       "You are not authorized to view this employee"
                  //     )
                  //   : navigate(
                  //       `/${companyDomain}/employee/${employee?.employeeId}`
                  //     )
                  navigate(`/${companyDomain}/employee/${employee?.employeeId}`)
                }
              >
                {employee?.lastName}, {employee?.firstName}
              </td>
              <td className="py-2">
                {employee.jobInformation?.length > 0
                  ? employee?.jobInformation[0]?.jobTitle
                  : "N/A"}
              </td>
              <td className="py-2">
                {employee.jobInformation?.length > 0
                  ? employee?.jobInformation[0]?.location
                  : "N/A"}
              </td>
              <td className="py-2">
                {employee.employmentStatusHistory?.length > 0
                  ? employee?.employmentStatusHistory[0]?.employmentStatus
                  : "N/A"}
              </td>
              <td className="py-2 pe-3">
                {new Date(employee?.hiringDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
