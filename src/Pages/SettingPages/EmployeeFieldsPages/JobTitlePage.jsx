import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import IconInput from "../../../components/InputFields/IconInput";
import { toast } from "react-toastify";
import SettingFieldTable from "../../../components/Tables/SettingFieldTable";

const JobTitlePage = ({ list, onAddField, onDelete, onEdit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const handleAddJobTitle = () => {
    if (jobTitle.trim() === "") {
      toast.error("Please enter a valid job title");
    } else if (jobTitle.trim().length < 3) {
      toast.error("Job title must be at least 3 characters long");
    } else {
      onAddField("jobTitle", jobTitle);
      setJobTitle("");
    }
  };
  return (
    <div className="px-5">
      <div className="flex items-center gap-3">
        <FaUserTie size={22} className="text-green1" />
        <h1 className="text-xl font-medium text-black">Job Title</h1>
      </div>

      <div className="mt-5">
        <div className="flex items-center">
          <IconInput
            width={250}
            value={jobTitle}
            setValue={setJobTitle}
            placeholder="New Item"
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <button
            className="mb-5 bg-tertiary hover:bg-green1 px-3 h-[35px] text-white font-medium text-sm rounded-sm"
            onClick={handleAddJobTitle}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-5">
        <SettingFieldTable
          headings={["Job Title"]}
          list={list}
          allowEdit={true}
          allowDelete={true}
          onEdit={(item) => {
            onEdit("jobTitle", item.label, item._id);
          }}
          onDelete={(id) => {
            onDelete("jobTitle", id);
          }}
        />
      </div>
    </div>
  );
};

export default JobTitlePage;
