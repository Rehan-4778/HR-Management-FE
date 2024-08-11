import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa6";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import IconInput from "../../components/InputFields/IconInput";
import EmployeeDetailTable from "../../components/Tables/EmployeeDetailTable";
import Modal from "../../components/Modals/Modal";
import EmpStatusModal from "../../components/Modals/EmpStatusModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeField,
  deleteEmployeeField,
  updateEmployeeField,
  updatePersonalInfo,
} from "../../store";
import { useParams } from "react-router-dom";
import JobInfoModal from "../../components/Modals/JobInfoModal";
import CompensationModal from "../../components/Modals/CompensationModal";
import { toast } from "react-toastify";

const empStatusHeadings = ["Effective Date", "Employment Status", "Comment"];
const jobInfoHeadings = [
  "Effective Date",
  "Location",
  "Division",
  "Department",
  "Job Title",
  "Reports To",
];
const compensationHeadings = [
  "Effective Date",
  "Pay Schedule	",
  "Pay Type",
  "Pay Rate",
  "Overtime",
  "Change Reason",
  "Comment",
];

const JobPage = ({ reportsToList }) => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const jobDetails = useSelector((state) => state?.employee?.userInfo);
  const { employeeId } = useParams();

  const [initialValues, setInitialValues] = useState({
    hireDate: jobDetails?.hiringDate || null,
  });

  const validationSchema = Yup.object({
    hireDate: Yup.string(),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    const response = await dispatch(
      updatePersonalInfo({
        employeeId,
        companyId,
        updateKey: "hiringDate",
        personalInfo: { hiringDate: values.hireDate },
      })
    );

    if (response.payload.success) {
      toast.success("Profile Updated Successfully");
    }
  };

  const [isEmpStatusModalOpen, setIsEmpStatusModalOpen] = useState(false);
  const [isJobInfoModalOpen, setIsJobInfoModalOpen] = useState(false);
  const [isCompensationModalOpen, setIsCompensationModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleDelete = async (id, name) => {
    await dispatch(
      deleteEmployeeField({
        employeeId,
        companyId,
        fieldName: name,
        fieldId: id,
      })
    );
  };

  const handleEditModal = (values, name) => {
    setEditItem(values);
    if (name === "employmentStatusHistory") {
      setIsEmpStatusModalOpen(true);
    } else if (name === "jobInformation") {
      setIsJobInfoModalOpen(true);
    } else if (name === "compensationHistory") {
      setIsCompensationModalOpen(true);
    }
  };

  const handleSave = async (values, name) => {
    await dispatch(
      addEmployeeField({
        employeeId,
        companyId: companyId,
        fieldName: name,
        fieldValue: values,
      })
    );
  };

  const handleEdit = async (values, name) => {
    console.log("name edit --", editItem, "\nValues --", values);
    setIsEmpStatusModalOpen(false);
    setIsJobInfoModalOpen(false);
    setIsCompensationModalOpen(false);

    let isUpdated = false;
    let newValues;
    if (name === "employmentStatusHistory") {
      newValues = {
        ...values,
        effectiveDate:
          values.effectiveDate === ""
            ? null
            : new Date(values.effectiveDate).toISOString(),
      };
    } else if (name === "jobInformation") {
      newValues = {
        ...values,
        effectiveDate:
          values.effectiveDate === ""
            ? null
            : new Date(values.effectiveDate).toISOString(),
      };
    } else if (name === "compensationHistory") {
      newValues = {
        ...values,
        effectiveDate:
          values.effectiveDate === ""
            ? null
            : new Date(values.effectiveDate).toISOString(),
      };
    } else {
      newValues = values;
    }

    Object.keys(values).forEach((key) => {
      if (editItem[key] !== newValues[key]) {
        isUpdated = true;
      }
    });

    if (!isUpdated) {
      setEditItem(null);
    } else {
      console.log("i am here finally", newValues);
      await dispatch(
        updateEmployeeField({
          employeeId,
          companyId,
          fieldName: name,
          fieldId: editItem._id,
          fieldValue: newValues,
        })
      );
      setEditItem(null);
    }
  };

  const isFormUpdated = (values) => {
    let isUpdated = false;
    console.log(new Date(values?.hireDate), jobDetails?.hiringDate);

    if (jobDetails?.hiringDate !== new Date(values?.hireDate).toISOString()) {
      isUpdated = true;
    }

    return isUpdated;
  };

  useEffect(() => {
    setInitialValues({
      hireDate: jobDetails?.hiringDate || null,
    });
  }, [jobDetails]);

  return (
    <div className="py-5 px-10">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex gap-3 border-b border-gray-400 mb-2">
          <FaBriefcase size={22} color="green" />
          <h2 className="text-lg font-semibold mb-4">Job Page</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <IconInput
                width={150}
                label="Hire Date"
                type="date"
                name="hireDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={
                  values?.hireDate
                    ? new Date(values?.hireDate)?.toISOString()?.split("T")[0]
                    : ""
                }
                error={errors.hireDate && touched.hireDate}
              />
              <div>
                <div className="flex justify-between items-center  border-t border-gray-400 my-5 pt-5">
                  <div className="flex gap-3">
                    <FaBriefcase size={22} color="green" />
                    <h2 className="text-lg font-semibold">
                      Employeement Status
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-green1"
                    onClick={() => setIsEmpStatusModalOpen(true)}
                  >
                    + Add Emp Status
                  </button>
                </div>

                <EmployeeDetailTable
                  headings={empStatusHeadings}
                  list={jobDetails?.employmentStatusHistory || []}
                  allowDelete
                  allowEdit
                  onDelete={(id) => handleDelete(id, "employmentStatusHistory")}
                  onEdit={(value) =>
                    handleEditModal(value, "employmentStatusHistory")
                  }
                />

                <Modal
                  isOpen={isEmpStatusModalOpen}
                  onClose={() => setIsEmpStatusModalOpen(false)}
                >
                  <EmpStatusModal
                    isOpen={isEmpStatusModalOpen}
                    onClose={() => setIsEmpStatusModalOpen(false)}
                    onSave={(values) =>
                      handleSave(values, "employmentStatusHistory")
                    }
                    onEdit={(values) =>
                      handleEdit(values, "employmentStatusHistory")
                    }
                    status={editItem}
                  />
                </Modal>
              </div>
              <div>
                <div className="flex justify-between items-center border-t border-gray-400 my-5 pt-5">
                  <div className="flex gap-3">
                    <FaBriefcase size={22} color="green" />
                    <h2 className="text-lg font-semibold">Job Information</h2>
                  </div>
                  <button
                    type="button"
                    className="flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-green1"
                    onClick={() => setIsJobInfoModalOpen(true)}
                  >
                    + Add Job Info
                  </button>
                </div>
                <EmployeeDetailTable
                  headings={jobInfoHeadings}
                  list={jobDetails?.jobInformation || []}
                  allowDelete
                  allowEdit
                  onDelete={(id) => handleDelete(id, "jobInformation")}
                  onEdit={(value) => handleEditModal(value, "jobInformation")}
                />

                <Modal
                  isOpen={isJobInfoModalOpen}
                  onClose={() => setIsJobInfoModalOpen(false)}
                >
                  <JobInfoModal
                    isOpen={isJobInfoModalOpen}
                    onClose={() => setIsJobInfoModalOpen(false)}
                    onSave={(values) => handleSave(values, "jobInformation")}
                    onEdit={(values) => handleEdit(values, "jobInformation")}
                    jobInfo={editItem}
                    employees={reportsToList}
                  />
                </Modal>
              </div>
              <div>
                <div className="flex justify-between items-center border-t border-gray-400 my-5 pt-5">
                  <div className="flex gap-3">
                    <FaBriefcase size={22} color="green" />
                    <h2 className="text-lg font-semibold">Compensation</h2>
                  </div>
                  <button
                    type="button"
                    className="flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-green1"
                    onClick={() => setIsCompensationModalOpen(true)}
                  >
                    + Add Compensation
                  </button>
                </div>
                <EmployeeDetailTable
                  headings={compensationHeadings}
                  list={jobDetails?.compensationHistory || []}
                  allowDelete
                  allowEdit
                  onDelete={(id) => handleDelete(id, "compensationHistory")}
                  onEdit={(value) =>
                    handleEditModal(value, "compensationHistory")
                  }
                />

                <Modal
                  isOpen={isCompensationModalOpen}
                  onClose={() => setIsCompensationModalOpen(false)}
                >
                  <CompensationModal
                    isOpen={isCompensationModalOpen}
                    onClose={() => setIsCompensationModalOpen(false)}
                    onSave={(values) =>
                      handleSave(values, "compensationHistory")
                    }
                    onEdit={(values) =>
                      handleEdit(values, "compensationHistory")
                    }
                    compensation={editItem}
                  />
                </Modal>
              </div>
              {isFormUpdated(values) && (
                <div className="-ml-10 mt-10 fixed bottom-0 bg-white border border-t w-full h-20 flex items-center">
                  <button
                    type="submit"
                    className=" bg-green1 text-white py-2 rounded-sm text-sm font-medium px-4 mx-5"
                  >
                    Update Profile
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
        <div className="mb-6"></div>
      </div>
    </div>
  );
};

export default JobPage;
