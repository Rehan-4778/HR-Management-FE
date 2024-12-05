import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import IconSelect from "../SelectFields/IconSelect";
import * as Yup from "yup";
import "./Modal.css";

const payScheduleOptions = [
  { value: "", label: "-Select-" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
];

const payTypeOptions = [
  { value: "", label: "-Select-" },
  { value: "hourly", label: "Hourly" },
  { value: "salary", label: "Salary" },
  { value: "daily", label: "Daily " },
  { value: "PerVisit", label: "Per visit" },
];

const payRateUnitOptions = [
  { value: "", label: "-Select-" },
  { value: "hour", label: "Per Hour" },
  { value: "year", label: "Per Year" },
];

const overtimeOptions = [
  { value: "Exempt", label: "Exempt" },
  { value: "Non-Exempt", label: "Non-Exempt" },
];

const validationSchema = Yup.object({
  effectiveDate: Yup.date().required("Effective date is required"),
  paySchedule: Yup.string().required("Pay schedule is required"),
  payType: Yup.string().required("Pay type is required"),
  payRate: Yup.number()
    .required("Pay rate is required")
    .positive("Pay rate must be positive"),
  payRateUnit: Yup.string().required("Pay rate unit is required"),
  overtime: Yup.string().required("Overtime status is required"),
  changeReason: Yup.string().required("Change reason is required"),
  comment: Yup.string(),
});

const CompensationModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  compensation,
}) => {
  const initialValues = compensation
    ? {
        effectiveDate: compensation.effectiveDate || "",
        paySchedule: compensation.paySchedule || "",
        payType: compensation.payType || "",
        payRate: compensation.payRate || "",
        payRateUnit: compensation.payRateUnit || "",
        overtime: compensation.overtime || "",
        changeReason: compensation.changeReason || "",
        comment: compensation.comment || "",
      }
    : {
        effectiveDate: "",
        paySchedule: "",
        payType: "",
        payRate: "",
        payRateUnit: "",
        overtime: "Exempt",
        changeReason: "",
        comment: "",
      };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {compensation ? "Edit" : "Add"} Compensation
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
            if (compensation) {
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
                  label="Pay Schedule"
                  name="paySchedule"
                  options={payScheduleOptions}
                  onChange={(item) => setFieldValue("paySchedule", item)}
                  onBlur={handleBlur}
                  value={values.paySchedule}
                  error={errors.paySchedule && touched.paySchedule}
                />
                <IconSelect
                  width={220}
                  label="Pay Type"
                  name="payType"
                  options={payTypeOptions}
                  onChange={(item) => setFieldValue("payType", item)}
                  onBlur={handleBlur}
                  value={values.payType}
                  error={errors.payType && touched.payType}
                />
                <IconInput
                  width={220}
                  label="Pay Rate"
                  placeholder="Pay Rate in USD"
                  type="number"
                  name="payRate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.payRate}
                  error={errors.payRate && touched.payRate}
                />
                <IconSelect
                  width={220}
                  label="Pay Rate Unit"
                  name="payRateUnit"
                  options={payRateUnitOptions}
                  onChange={(item) => setFieldValue("payRateUnit", item)}
                  onBlur={handleBlur}
                  value={values.payRateUnit}
                  error={errors.payRateUnit && touched.payRateUnit}
                />
                <IconSelect
                  width={220}
                  label="Overtime"
                  name="overtime"
                  options={overtimeOptions}
                  onChange={(item) => setFieldValue("overtime", item)}
                  onBlur={handleBlur}
                  value={values.overtime}
                  error={errors.overtime && touched.overtime}
                />
                <IconInput
                  width={220}
                  label="Change Reason"
                  type="text"
                  name="changeReason"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.changeReason}
                  error={errors.changeReason && touched.changeReason}
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

export default CompensationModal;
