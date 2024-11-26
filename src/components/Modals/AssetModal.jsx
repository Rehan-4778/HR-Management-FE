import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import IconSelect from "../SelectFields/IconSelect";
import * as Yup from "yup";
import "./Modal.css";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  assetCategory: Yup.string().required("Asset category is required"),
  assetDescription: Yup.string().required("Asset description is required"),
  serialNumber: Yup.string().required("Serial number is required"),
  dateAssigned: Yup.date().required("Date assigned is required"),
  dateReturned: Yup.date(),
});

const AssetModal = ({ isOpen, onClose, onSave, onEdit, asset }) => {
  const { assetCategory: assetCategories } = useSelector(
    (state) => state?.setting?.employeeFields
  );
  const initialValues = asset
    ? {
        assetCategory: asset.assetCategory || "",
        assetDescription: asset.assetDescription || "",
        serialNumber: asset.serialNumber || "",
        dateAssigned: asset.dateAssigned || "",
        dateReturned: asset.dateReturned || "",
      }
    : {
        assetCategory: "",
        assetDescription: "",
        serialNumber: "",
        dateAssigned: "",
        dateReturned: "",
      };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Assets Item</p>
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
            if (asset) {
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
                  label="Asset Category"
                  name="assetCategory"
                  options={assetCategories}
                  onChange={(value) => setFieldValue("assetCategory", value)}
                  onBlur={handleBlur}
                  value={values.assetCategory}
                  error={errors.assetCategory && touched.assetCategory}
                />
                <IconInput
                  width={220}
                  label="Asset Description"
                  type="text"
                  name="assetDescription"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.assetDescription}
                  error={errors.assetDescription && touched.assetDescription}
                />
                <IconInput
                  width={220}
                  label="Serial #"
                  type="text"
                  name="serialNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.serialNumber}
                  error={errors.serialNumber && touched.serialNumber}
                />
                <IconInput
                  width={160}
                  label="Date Assigned"
                  type="date"
                  name="dateAssigned"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={
                    values.dateAssigned
                      ? new Date(values.dateAssigned)
                          .toISOString()
                          .split("T")[0]
                      : values.dateAssigned
                  }
                  error={errors.dateAssigned && touched.dateAssigned}
                />
                <IconInput
                  width={160}
                  label="Date Returned"
                  type="date"
                  name="dateReturned"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={
                    values.dateReturned
                      ? new Date(values.dateReturned)
                          .toISOString()
                          .split("T")[0]
                      : values.dateReturned
                  }
                  error={errors.dateReturned && touched.dateReturned}
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

export default AssetModal;
