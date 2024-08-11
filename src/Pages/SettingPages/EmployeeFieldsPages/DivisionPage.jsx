import React, { useState } from "react";
import { FaSitemap } from "react-icons/fa6";
import IconInput from "../../../components/InputFields/IconInput";
import { toast } from "react-toastify";
import SettingFieldTable from "../../../components/Tables/SettingFieldTable";

const DivisionPage = ({ list, onAddField, onDelete, onEdit }) => {
  const [division, setDivision] = useState("");
  const handleAddDivision = () => {
    if (division.trim() === "") {
      toast.error("Please enter a valid division");
    } else if (division.length < 3) {
      toast.error("Division must be at least 3 characters long");
    } else {
      onAddField("division", division);
      setDivision("");
    }
  };
  return (
    <div className="px-5">
      <div className="flex items-center gap-3">
        <FaSitemap size={22} className="text-green1" />
        <h1 className="text-xl font-medium text-black">Division</h1>
      </div>

      <div className="mt-5">
        <div className="flex items-center">
          <IconInput
            width={250}
            value={division}
            setValue={setDivision}
            placeholder="New Item"
            onChange={(e) => setDivision(e.target.value)}
          />
          <button
            className="mb-5 bg-tertiary hover:bg-green1 px-3 h-[35px] text-white font-medium text-sm rounded-sm"
            onClick={handleAddDivision}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-5">
        <SettingFieldTable
          headings={["Division"]}
          list={list}
          allowEdit={true}
          allowDelete={true}
          onEdit={(item) => {
            onEdit("division", item.label, item._id);
          }}
          onDelete={(id) => {
            onDelete("division", id);
          }}
        />
      </div>
    </div>
  );
};

export default DivisionPage;
