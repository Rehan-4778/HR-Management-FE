import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import * as Yup from "yup";
import "./Modal.css";
import IconSelect from "../SelectFields/IconSelect";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  //   date: Yup.date().required("Date is required"),
  visaType: Yup.string().required("Visa type is required"),
  issuingCountry: Yup.string().required("Issuing country is required"),
  issuedDate: Yup.date().required("Issued date is required"),
  expirationDate: Yup.date(),
  note: Yup.string(),
});

const VisaInfoModal = ({ isOpen, onClose, onSave, onEdit, visaInfo }) => {
  const { visaType: visaTypeOptions } = useSelector(
    (state) => state?.setting?.employeeFields
  );

  const initialValues = visaInfo
    ? {
        // date: visaInfo.date || "",
        visaType: visaInfo.visaType || "",
        issuingCountry: visaInfo.issuingCountry || "",
        issuedDate: visaInfo.issuedDate || "",
        expirationDate: visaInfo.expirationDate || "",
        note: visaInfo.note || "",
      }
    : {
        // date: "",
        visaType: "",
        issuingCountry: "",
        issuedDate: "",
        expirationDate: "",
        note: "",
      };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {visaInfo ? "Edit" : "Add"} Visa Information
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
            if (visaInfo) {
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
                <IconSelect
                  width={220}
                  label="Visa Type"
                  name="visaType"
                  options={visaTypeOptions}
                  onChange={(value) => setFieldValue("visaType", value)}
                  onBlur={handleBlur}
                  value={values.visaType}
                  error={errors.visaType && touched.visaType}
                />
                <IconInput
                  width={220}
                  label="Issuing Country"
                  type="text"
                  name="issuingCountry"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.issuingCountry}
                  error={errors.issuingCountry && touched.issuingCountry}
                />
                <IconInput
                  width={220}
                  label="Issued Date"
                  type="date"
                  name="issuedDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={
                    values.issuedDate
                      ? new Date(values.issuedDate).toISOString().split("T")[0]
                      : values.issuedDate
                  }
                  error={errors.issuedDate && touched.issuedDate}
                />
                <IconInput
                  width={220}
                  label="Expiration Date"
                  type="date"
                  name="expirationDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={
                    values.expirationDate
                      ? new Date(values.expirationDate)
                          .toISOString()
                          .split("T")[0]
                      : values.expirationDate
                  }
                  error={errors.expirationDate && touched.expirationDate}
                />
                <IconInput
                  width={220}
                  label="Note"
                  type="text"
                  name="note"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.note}
                  error={errors.note && touched.note}
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

export default VisaInfoModal;
