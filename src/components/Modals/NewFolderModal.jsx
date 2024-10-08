import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import IconInput from "../InputFields/IconInput"; // Assuming you have this component
import "./Modal.css";

const validationSchema = Yup.object({
  // folderName with min 5 characters
  folderName: Yup.string()
    .min(5, "Folder name must be at least 5 characters")
    .required("Folder name is required"),
  description: Yup.string(),
});

const NewFolderModal = ({ isOpen, onClose, onSave }) => {
  const initialValues = {
    folderName: "",
    description: "",
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create New Folder</p>
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
            setSubmitting(true);
            onSave(values);
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
                <IconInput
                  width={250}
                  label="Folder Name"
                  type="text"
                  name="folderName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.folderName}
                  error={errors.folderName && touched.folderName}
                />
                {errors.folderName && touched.folderName && (
                  <p className="text-danger text-xs font-medium -mt-4 mb-4">
                    {errors.folderName}
                  </p>
                )}
                <IconInput
                  multiLine
                  width={300}
                  style={{ height: 100 }}
                  label="Description"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={errors.description && touched.description}
                />
                <div className="my-5" />
              </div>
              <footer className="modal-card-foot">
                <button
                  type="submit"
                  className="button button-success"
                  onClick={() => handleSubmit()}
                >
                  Create
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

export default NewFolderModal;
