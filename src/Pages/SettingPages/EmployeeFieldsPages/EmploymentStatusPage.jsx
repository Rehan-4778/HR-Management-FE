import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa6";
import IconInput from "../../../components/InputFields/IconInput";
import { toast } from "react-toastify";
import SettingFieldTable from "../../../components/Tables/SettingFieldTable";

const EmploymentStatusPage = ({ list, onAddField, onDelete, onEdit }) => {
  const [employmentStatus, setEmploymentStatus] = useState("");
  const handleAddEmploymentStatus = () => {
    if (employmentStatus.trim() === "") {
      toast.error("Please enter a valid employment status");
    } else if (employmentStatus.trim().length < 3) {
      toast.error("Employment status must be at least 3 characters long");
    } else {
      onAddField("employmentStatus", employmentStatus);
      setEmploymentStatus("");
    }
  };
  return (
    <div className="px-5">
      <div className="flex items-center gap-3">
        <FaBriefcase size={22} className="text-green1" />
        <h1 className="text-xl font-medium text-black">Employment Status</h1>
      </div>

      <div className="mt-5">
        <div className="flex items-center">
          <IconInput
            width={250}
            value={employmentStatus}
            setValue={setEmploymentStatus}
            placeholder="New Item"
            onChange={(e) => setEmploymentStatus(e.target.value)}
          />
          <button
            className="mb-5 bg-tertiary hover:bg-green1 px-3 h-[35px] text-white font-medium text-sm rounded-sm"
            onClick={handleAddEmploymentStatus}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-5">
        <SettingFieldTable
          headings={["Employment Status"]}
          list={list}
          allowEdit={true}
          allowDelete={true}
          onEdit={(item) => {
            onEdit("employmentStatus", item.label, item._id);
          }}
          onDelete={(id) => {
            onDelete("employmentStatus", id);
          }}
        />
      </div>
    </div>
  );
};

export default EmploymentStatusPage;
