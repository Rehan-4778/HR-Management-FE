import React, { useState } from "react";
import { FaBuilding } from "react-icons/fa6";
import IconInput from "../../../components/InputFields/IconInput";
import { toast } from "react-toastify";
import SettingFieldTable from "../../../components/Tables/SettingFieldTable";

const DepartmentPage = ({ list, onAddField, onDelete, onEdit }) => {
  const [department, setDepartment] = useState("");

  const handleAddDepartment = () => {
    if (department.trim() === "") {
      toast.error("Please enter a valid department");
    } else if (department.trim().length < 3) {
      toast.error("Department must be at least 3 characters long");
    } else {
      onAddField("department", department);
      setDepartment("");
    }
  };

  return (
    <div className="px-5">
      <div className="flex items-center gap-3">
        <FaBuilding size={22} className="text-green1" />
        <h1 className="text-xl font-medium text-black">Department</h1>
      </div>

      <div className="mt-5">
        <div className="flex items-center">
          <IconInput
            width={250}
            value={department}
            setValue={setDepartment}
            placeholder="New Item"
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button
            className="mb-5 bg-tertiary hover:bg-green1 px-3 h-[35px] text-white font-medium text-sm rounded-sm"
            onClick={handleAddDepartment}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-5">
        <SettingFieldTable
          headings={["Department"]}
          list={list}
          allowEdit={true}
          allowDelete={true}
          onEdit={(item) => {
            onEdit("department", item.label, item._id);
          }}
          onDelete={(id) => {
            onDelete("department", id);
          }}
        />
      </div>
    </div>
  );
};

export default DepartmentPage;
