import React, { useState } from "react";
import IconSelect from "../../../components/SelectFields/IconSelect";

const JobInformationPage = ({ employees, permission }) => {
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Information</h1>
      <p className="mb-4">
        Note: Properly managing job information updates is critical to
        maintaining accurate and up-to-date records.
      </p>
      <div className="mb-4">
        <label className="block text-gray-700 mb-5">
          Who can approve job information updates for an employee?
        </label>
        <IconSelect
          width={230}
          label="Select Approver"
          name="approver"
          onChange={(value) => setSelectedApprover(value)}
          options={approverOptions}
          value={selectedApprover}
        />
      </div>
      {selectedApprover === "specific" && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
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
              permissionName: "jobInformation",
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

export default JobInformationPage;
