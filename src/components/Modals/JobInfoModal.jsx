import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import * as Yup from "yup";
import "./Modal.css";
import IconSelect from "../SelectFields/IconSelect";
import { useSelector } from "react-redux";

const JobInfoModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  jobInfo,
  employees,
}) => {
  const initialValues = jobInfo
    ? {
        effectiveDate: jobInfo.effectiveDate || "",
        location: jobInfo.location || "",
        division: jobInfo.division || "",
        department: jobInfo.department || "",
        jobTitle: jobInfo.jobTitle || "",
        reportsTo: jobInfo.reportsTo || "",
      }
    : {
        effectiveDate: "",
        location: "",
        division: "",
        department: "",
        jobTitle: "",
        reportsTo: "",
      };

  const {
    department: departmentOptions,
    division: divisionOptions,
    jobTitle: jobTitleOptions,
  } = useSelector((state) => state.setting.employeeFields);

  const validationSchema = Yup.object({
    effectiveDate: Yup.date().required("Effective date is required"),
    location: Yup.string().required("Location is required"),
    division: Yup.string().required("Division is required"),
    department: Yup.string().required("Department is required"),
    jobTitle: Yup.string().required("Job title is required"),
    // reportsTo: Yup.string().required("Reports to is required"),
  });

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {jobInfo ? "Edit" : "Add"} Job Information
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={true}
          onSubmit={(values, { setSubmitting }) => {
            if (jobInfo) {
              onEdit(values);
              return;
            } else {
              setSubmitting(true);
              onSave(values);
              setSubmitting(false);
              onClose();
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="modal-card-body">
                <IconInput
                  width={220}
                  label="Effective Date"
                  type="date"
                  name="effectiveDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={
                    values.effectiveDate
                      ? new Date(values.effectiveDate)
                          .toISOString()
                          .split("T")[0]
                      : values.effectiveDate
                  }
                  error={errors.effectiveDate && touched.effectiveDate}
                />
                <IconInput
                  width={220}
                  label="Location"
                  type="text"
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  error={errors.location && touched.location}
                />
                <IconSelect
                  width={220}
                  label="Department"
                  type="text"
                  name="department"
                  options={departmentOptions}
                  onChange={(value) => {
                    setFieldValue("department", value);
                  }}
                  onBlur={handleBlur}
                  value={values.department}
                  error={errors.department && touched.department}
                />
                <IconSelect
                  width={220}
                  label="Division"
                  type="text"
                  name="division"
                  options={divisionOptions}
                  onChange={(value) => {
                    setFieldValue("division", value);
                  }}
                  onBlur={handleBlur}
                  value={values.division}
                  error={errors.division && touched.division}
                />
                <IconSelect
                  width={220}
                  label="Job Title"
                  type="text"
                  name="jobTitle"
                  options={jobTitleOptions}
                  onChange={(value) => {
                    setFieldValue("jobTitle", value);
                  }}
                  onBlur={handleBlur}
                  value={values.jobTitle}
                  error={errors.jobTitle && touched.jobTitle}
                />
                <IconSelect
                  width={220}
                  label="Reports To"
                  name="reportsTo"
                  options={employees?.map((emp) => ({
                    value: emp._id,
                    label: emp.firstName + " " + emp.lastName,
                  }))}
                  onChange={(item) => setFieldValue("reportsTo", item)}
                  onBlur={handleBlur}
                  value={values.reportsTo}
                  error={errors.reportsTo && touched.reportsTo}
                />
                <div className="mb-5" />
              </div>
              <footer className="modal-card-foot">
                <button
                  type="submit"
                  className="button button-success"
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="button button-error"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JobInfoModal;
