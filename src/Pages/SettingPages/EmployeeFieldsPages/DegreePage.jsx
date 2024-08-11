import React, { useState } from "react";
import { FaAddressCard } from "react-icons/fa6";
import IconInput from "../../../components/InputFields/IconInput";
import { toast } from "react-toastify";
import SettingFieldTable from "../../../components/Tables/SettingFieldTable";

const DegreePage = ({ list, onAddField, onDelete, onEdit }) => {
  const [degree, setDegree] = useState("");
  const handleAddDegree = () => {
    if (degree.trim() === "") {
      toast.error("Please enter a valid degree");
    } else if (degree.trim().length < 3) {
      toast.error("Degree must be at least 3 characters long");
    } else {
      onAddField("degree", degree);
      setDegree("");
    }
  };
  return (
    <div className="px-5">
      <div className="flex items-center gap-3">
        <FaAddressCard size={22} className="text-green1" />
        <h1 className="text-xl font-medium text-black">Degree</h1>
      </div>

      <div className="mt-5">
        <div className="flex items-center">
          <IconInput
            width={250}
            value={degree}
            setValue={setDegree}
            placeholder="New Item"
            onChange={(e) => setDegree(e.target.value)}
          />
          <button
            className="mb-5 bg-tertiary hover:bg-green1 px-3 h-[35px] text-white font-medium text-sm rounded-sm"
            onClick={handleAddDegree}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-5">
        <SettingFieldTable
          headings={["Degree"]}
          list={list}
          allowEdit={true}
          allowDelete={true}
          onEdit={(item) => {
            onEdit("degree", item.label, item._id);
          }}
          onDelete={(id) => {
            onDelete("degree", id);
          }}
        />
      </div>
    </div>
  );
};

export default DegreePage;
