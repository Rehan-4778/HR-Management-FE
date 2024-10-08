import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import * as Yup from "yup";
import "./Modal.css";
import IconSelect from "../SelectFields/IconSelect";
import { useSelector } from "react-redux";

const EmpStatusModal = ({ isOpen, onClose, onSave, onEdit, status }) => {
  const { employmentStatus: employmentStatusOptions } = useSelector(
    (state) => state.setting.employeeFields
  );

  const initialValues = status
    ? {
        effectiveDate: status.effectiveDate || "",
        employmentStatus: status.employmentStatus || "",
        comment: status.comment || "",
      }
    : {
        effectiveDate: "",
        employmentStatus: "",
        comment: "",
      };
  const validationSchema = Yup.object({
    effectiveDate: Yup.date().required("Effective date is required"),
    employmentStatus: Yup.string().required("Employment status is required"),
    comment: Yup.string(),
  });

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {status ? "Edit" : "Add"} Employment Status
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
            if (status) {
              onEdit(values);
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
                <IconSelect
                  width={220}
                  label="Employment Status"
                  name="employmentStatus"
                  options={employmentStatusOptions}
                  onChange={(item) => setFieldValue("employmentStatus", item)}
                  onBlur={handleBlur}
                  value={values.employmentStatus}
                  error={errors.employmentStatus && touched.employmentStatus}
                />
                <IconInput
                  width={220}
                  label="Comment"
                  type="text"
                  name="comment"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comment}
                  error={errors.comment && touched.comment}
                />
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

export default EmpStatusModal;
