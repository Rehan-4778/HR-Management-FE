import React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
                  src={employee.photoUrl}
                  alt="Employee"
                  className="w-20 h-20 rounded-full"
                />
              </td>
              <td className="py-2">{employee.employeeNumber}</td>
              <td
                className="py-2 hover:underline text-blue-600 cursor-pointer"
                onClick={() => navigate(`/${companyDomain}/my-info`)}
              >
                {employee.lastName}, {employee.firstName}
              </td>
              <td className="py-2">{employee.jobTitle}</td>
              <td className="py-2">{employee.location}</td>
              <td className="py-2">{employee.employmentStatus}</td>
              <td className="py-2 pe-3">{employee.hireDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
