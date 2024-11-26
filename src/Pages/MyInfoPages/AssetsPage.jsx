import React, { useState } from "react";
import EmployeeDetailTable from "../../components/Tables/EmployeeDetailTable";
import { RiProfileLine } from "react-icons/ri";
import AssetModal from "../../components/Modals/AssetModal";
import Modal from "../../components/Modals/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployeeField,
  deleteEmployeeField,
  updateEmployeeField,
} from "../../store";
import { useParams } from "react-router-dom";

const AssetsPage = () => {
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const assetsData = useSelector((state) => state?.employee?.userInfo?.assets);
  const { employeeId } = useParams();
  const [editItem, setEditItem] = useState(null);

  const assetsHeadings = [
    "Asset Category",
    "Asset Description",
    "Serial #",
    "Date Assigned",
    "Date Returned",
  ];

  const handleSave = async (values) => {
    await dispatch(
      addEmployeeField({
        employeeId,
        companyId: companyId,
        fieldName: "assets",
        fieldValue: values,
      })
    );
  };

  const handleDelete = async (id) => {
    console.log("deleting asset", id);
    await dispatch(
      deleteEmployeeField({
        employeeId,
        companyId,
        fieldName: "assets",
        fieldId: id,
      })
    );
  };

  const handleEditModal = (values) => {
    setEditItem(values);
    setIsAssetModalOpen(true);
  };

  const handleEdit = async (values) => {
    setIsAssetModalOpen(false);

    let isUpdated = false;

    let newValues = {
      ...values,
      dateAssigned:
        values.dateAssigned === ""
          ? null
          : new Date(values.dateAssigned).toISOString(),
      dateReturned:
        values.dateReturned === ""
          ? null
          : new Date(values.dateReturned).toISOString(),
    };

    Object.keys(values).forEach((key) => {
      if (editItem[key] !== newValues[key]) {
        isUpdated = true;
      }
    });

    if (!isUpdated) {
      setEditItem(null);
    } else {
      await dispatch(
        updateEmployeeField({
          employeeId,
          companyId,
          fieldName: "assets",
          fieldId: editItem._id,
          fieldValue: newValues,
        })
      );
    }
  };

  return (
    <div className="py-5 px-10">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex justify-between items-center  border-b border-gray-400">
          <div className="flex gap-3">
            <RiProfileLine size={26} color="green" />
            <h2 className="text-lg font-semibold mb-4 text-black">Assets</h2>
          </div>
          <button
            className="flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-green1"
            onClick={() => setIsAssetModalOpen(true)}
          >
            + Add Asset
          </button>
        </div>

        <EmployeeDetailTable
          headings={assetsHeadings}
          list={assetsData}
          allowDelete
          allowEdit
          onDelete={handleDelete}
          onEdit={handleEditModal}
        />
        <div className="mb-6" />

        <Modal
          isOpen={isAssetModalOpen}
          onClose={() => setIsAssetModalOpen(false)}
        >
          <AssetModal
            isOpen={isAssetModalOpen}
            onClose={() => setIsAssetModalOpen(false)}
            onSave={handleSave}
            onEdit={handleEdit}
            asset={editItem}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AssetsPage;
