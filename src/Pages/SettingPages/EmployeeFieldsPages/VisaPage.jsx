import React, { useState } from "react";
import { FaPassport } from "react-icons/fa6";
import IconInput from "../../../components/InputFields/IconInput";
import { toast } from "react-toastify";
import SettingFieldTable from "../../../components/Tables/SettingFieldTable";

const VisaPage = ({ list, onAddField, onDelete, onEdit }) => {
  const [visa, setVisa] = useState("");
  const handleAddVisa = () => {
    if (visa.trim() === "") {
      toast.error("Please enter a valid visa type");
    } else if (visa.length < 3) {
      toast.error("Visa type must be at least 3 characters long");
    } else {
      onAddField("visaType", visa);
      setVisa("");
    }
  };
  return (
    <div className="px-5">
      <div className="flex items-center gap-3">
        <FaPassport size={22} className="text-green1" />
        <h1 className="text-xl font-medium text-black">Visa</h1>
      </div>

      <div className="mt-5">
        <div className="flex items-center">
          <IconInput
            width={250}
            value={visa}
            setValue={setVisa}
            placeholder="New Item"
            onChange={(e) => setVisa(e.target.value)}
          />
          <button
            className="mb-5 bg-tertiary hover:bg-green1 px-3 h-[35px] text-white font-medium text-sm rounded-sm"
            onClick={handleAddVisa}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-5">
        <SettingFieldTable
          headings={["Visa Type"]}
          list={list}
          allowEdit={true}
          allowDelete={true}
          onEdit={(item) => {
            onEdit("visaType", item.label, item._id);
          }}
          onDelete={(id) => {
            onDelete("visaType", id);
          }}
        />
      </div>
    </div>
  );
};

export default VisaPage;
