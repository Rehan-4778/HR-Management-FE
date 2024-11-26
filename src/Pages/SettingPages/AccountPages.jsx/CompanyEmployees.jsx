import React, { useEffect } from "react";
import User from "../../../assets/images/people.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getCompanyEmployeesList } from "../../../store";
import { hideLoading, showLoading } from "../../../store/slices/loadingSlice";
import { toast } from "react-toastify";

const CompanyEmployees = () => {
  const dispatch = useDispatch();
  //   const { companyDomain } = useParams();
  const selectedCompany = useSelector((state) => state.auth.selectedCompany);
  const userId = useSelector(
    (state) => state?.auth?.selectedCompany?.profile?._id
  );
  const employeesList = useSelector((state) => state.employee.employees);
  const isOwner = useSelector((state) => state.employee.isOwner);

  const getEmployeesList = async () => {
    try {
      dispatch(showLoading());
      const response = await dispatch(
        getCompanyEmployeesList({ companyId: selectedCompany.company._id })
      );
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  const handleDeleteEmployee = async (id) => {
    const response = await dispatch(
      deleteEmployee({ companyId: selectedCompany.company._id, employeeId: id })
    );
    if (response?.payload?.success) {
      toast.success("Employee deleted successfully");
      getEmployeesList();
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-xl mb-4 font-medium">Manage Employees</h1>

      <div className="my-5">
        {employeesList?.length > 0 &&
          employeesList?.map((emp) => {
            return (
              <div
                key={emp?._id}
                className={`flex items-center py-2 px-5 even:bg-white odd:bg-gray-50`}
              >
                <span className="flex-shrink-0 w-16">
                  {emp?.image ? (
                    <img
                      src={emp.image}
                      alt="Employee"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={User}
                      alt="Employee"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </span>

                <span className="w-1/2 text-sm font-medium text-gray-800 ">
                  {emp?.firstName + " " + emp?.lastName}
                </span>

                <span className="w-1/2 text-sm font-medium text-gray-800 ">
                  {emp?.jobInformation?.[0]?.jobTitle || "-"}
                </span>

                {isOwner && emp._id !== userId ? (
                  <span className="flex justify-end">
                    <button
                      className="bg-red-500 px-3 py-1 rounded-sm text-xs text-white hover:bg-red-600 transition"
                      onClick={() => handleDeleteEmployee(emp.employeeId)}
                    >
                      Delete
                    </button>
                  </span>
                ) : (
                  <span className="text-sm mx-2 text-green-700 font-semibold">
                    Owner
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CompanyEmployees;
