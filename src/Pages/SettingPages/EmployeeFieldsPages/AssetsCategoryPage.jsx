import React, { useState } from "react";
import IconInput from "../../../components/InputFields/IconInput";
import { toast } from "react-toastify";
import SettingFieldTable from "../../../components/Tables/SettingFieldTable";
import { MdDevices } from "react-icons/md";

const AssetsCategoryPage = ({ list, onAddField, onDelete, onEdit }) => {
  const [assetCategory, setAssetCategory] = useState("");
  const handleAddAssetCategory = () => {
    if (assetCategory.trim() === "") {
      toast.error("Please enter a valid asset category");
    } else if (assetCategory.trim().length < 3) {
      toast.error("Asset category must be at least 3 characters long");
    } else {
      onAddField("assetCategory", assetCategory);
      setAssetCategory("");
    }
  };
  return (
    <div className="px-5">
      <div className="flex items-center gap-3">
        <MdDevices size={24} className="text-green1" />
        <h1 className="text-xl font-medium text-black">Asset Category</h1>
      </div>

      <div className="mt-5">
        <div className="flex items-center">
          <IconInput
            width={250}
            value={assetCategory}
            setValue={setAssetCategory}
            placeholder="New Item"
            onChange={(e) => setAssetCategory(e.target.value)}
          />
          <button
            className="mb-5 bg-tertiary hover:bg-green1 px-3 h-[35px] text-white font-medium text-sm rounded-sm"
            onClick={handleAddAssetCategory}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-5">
        <SettingFieldTable
          headings={["Asset Category"]}
          list={list}
          allowEdit={true}
          allowDelete={true}
          onEdit={(item) => {
            onEdit("assetCategory", item.label, item._id);
          }}
          onDelete={(id) => {
            onDelete("assetCategory", id);
          }}
        />
      </div>
    </div>
  );
};

export default AssetsCategoryPage;
