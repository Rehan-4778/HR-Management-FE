import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import * as Yup from "yup";
import "./Modal.css";

const validationSchema = Yup.object({
  holiday: Yup.string().required("Holiday name is required"),
  date: Yup.date().required("Date is required"),
  // for: Yup.string().required("This field is required"),
  description: Yup.string().max(
    500,
    "Description cannot exceed 500 characters"
  ),
});

const HolidayModal = ({ isOpen, onClose, onSave, onEdit, holiday }) => {
  const initialValues = holiday
    ? {
        holiday: holiday.name || "",
        date: holiday.date
          ? new Date(holiday.date).toISOString().split("T")[0]
          : "",
        // for: holiday.for || "All Employees",
        description: holiday.description || "",
      }
    : {
        holiday: "",
        date: "",
        // for: "All Employees",
        description: "",
      };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {holiday ? "Edit Holiday" : "Add Holiday"}
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
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            if (holiday) {
              onEdit(values);
            } else {
              onSave(values);
            }
            setSubmitting(false);
            onClose();
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="modal-card-body">
                <div className="form-group">
                  <IconInput
                    width={220}
                    label="Holiday"
                    type="text"
                    name="holiday"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.holiday}
                    error={errors.holiday && touched.holiday}
                  />
                  {errors.holiday && touched.holiday && (
                    <p className="error-message">{errors.holiday}</p>
                  )}
                </div>
                <div className="form-group">
                  <IconInput
                    width={220}
                    label="Date"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    error={errors.date && touched.date}
                  />
                  {errors.date && touched.date && (
                    <p className="error-message">{errors.date}</p>
                  )}
                </div>
                {/* <div className="form-group">
                  <IconInput
                    width={220}
                    label="For"
                    type="text"
                    name="for"
                    value={values.for}
                    disabled={true}
                  />
                </div> */}
                <div className="form-group">
                  <IconInput
                    width={300}
                    style={{ height: 100 }}
                    multiLine={true}
                    label="Description"
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={errors.description && touched.description}
                  />
                  {errors.description && touched.description && (
                    <p className="error-message">{errors.description}</p>
                  )}
                </div>
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

export default HolidayModal;
