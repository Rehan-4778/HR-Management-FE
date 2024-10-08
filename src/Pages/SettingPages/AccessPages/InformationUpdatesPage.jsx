import React, { useState } from "react";
import IconSelect from "../../../components/SelectFields/IconSelect";
import { toast } from "react-toastify";

const InformationUpdatesPage = ({
  employees,
  permission,
  updatePermission,
}) => {
  const [selectedApprover, setSelectedApprover] = useState(
    permission?.approver
  );
  const [specificPerson, setSpecificPerson] = useState(
    permission?.specificPerson
  );

  const approverOptions = [
    { value: "manager", label: "Manager (Reports To)" },
    { value: "account_owner", label: "Account Owner" },
    { value: "manager-manager", label: "Manager's Manager" },
    { value: "specific", label: "Specific Person" },
    { value: "full_admin", label: "Full Admin" },
  ];

  console.log("permission", permission);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Information Updates</h1>
      <p className="mb-4">
        Note: By adding an employee to this workflow, you may be giving them
        access to sensitive information that they normally don't have permission
        to view.
      </p>
      <div className="mb-4">
        <label className="block text-gray-700 mb-5">
          Who can approve information updates for an employee?
        </label>
        <IconSelect
          width={230}
          label="Select Approver"
          name="approver"
          onChange={(value) => {
            setSelectedApprover(value);
          }}
          options={approverOptions}
          value={selectedApprover}
        />
      </div>
      {selectedApprover === "specific" && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-5">
            Select Specific Person
          </label>
          <IconSelect
            width={230}
            label="Select Person"
            name="specificPerson"
            onChange={(value) => setSpecificPerson(value)}
            options={employees?.map((emp) => ({
              value: emp?._id,
              label: emp?.firstName + " " + emp?.lastName,
            }))}
            value={specificPerson}
          />
        </div>
      )}

      {(permission?.approver !== selectedApprover ||
        permission?.specificPerson !== specificPerson) && (
        <button
          className="bg-green1 text-white font-medium py-2 px-4 rounded-sm"
          onClick={() => {
            if (selectedApprover === "specific" && !specificPerson) {
              toast.error("Please select a specific person");
              return;
            }
            updatePermission({
              permissionName: "informationUpdates",
              approver: selectedApprover,
              specificPerson: specificPerson,
            });
          }}
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default InformationUpdatesPage;
