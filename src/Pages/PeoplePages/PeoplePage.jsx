import React, { useState, useEffect } from "react";
import { BsFillPeopleFill, BsList } from "react-icons/bs";
import EmployeeTable from "../../components/Tables/EmployeeTable";
import { FaPlusCircle } from "react-icons/fa";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyEmployeesList } from "../../store";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";
import OrganizationChart from "./OrganizationChart";

const PeoplePage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const navigate = useNavigate();
  const { companyDomain } = useParams();
  const selectedCompany = useSelector((state) => state.auth.selectedCompany);
  const employeesList = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  console.log(employeesList);

  const getEmployeesList = async () => {
    try {
      dispatch(showLoading());
      const response = await dispatch(
        getCompanyEmployeesList({ companyId: selectedCompany.company._id })
      );

      console.log(response);
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  const handleNavigate = () => {
    navigate(`/${companyDomain}/employees/new`);
  };

  return (
    <div className="mt-24 px-10 min-h-screen">
      <div className="flex gap-3 mb-5">
        <BsFillPeopleFill size={30} className="text-green1" />
        <h1 className="text-3xl font-semibold text-green1">People</h1>
      </div>

      <div className="pt-3 border-b-[1.25px]">
        <div className="mt-3 flex items-center justify-end relative">
          <button
            className="border-[1.25px] border-primary text-primary font-semibold px-4 py-[6px] rounded-sm flex gap-3 items-center absolute left-0 mb-10"
            onClick={handleNavigate}
          >
            <FaPlusCircle size={16} color="text-primary" />
            <span>New Employee</span>
          </button>
          <div className="pr-10 flex gap-10">
            <div
              className={`flex items-center  hover:text-secondary cursor-pointer pb-2 ${
                activeTab === "list" && "border-b-2 border-secondary"
              }`}
              onClick={() => setActiveTab("list")}
            >
              <BsList size={20} className="text-secondary" />
              <span className="ml-2 text-sm text-secondary font-semibold">
                List
              </span>
            </div>

            <div
              className={`flex items-center hover:text-secondary cursor-pointer pb-2 ${
                activeTab === "org" && "border-b-2 border-secondary "
              }`}
              onClick={() => setActiveTab("org")}
            >
              <VscTypeHierarchySub size={20} className="text-secondary" />
              <span className="ml-2 text-sm text-secondary font-semibold">
                Organization Chart
              </span>
            </div>
          </div>
        </div>
      </div>

      {activeTab === "list" ? (
        <div className="mt-5">
          <EmployeeTable data={employeesList} />
        </div>
      ) : (
        <div className="mt-8">
          <OrganizationChart />
        </div>
      )}
    </div>
  );
};

export default PeoplePage;
