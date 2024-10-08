import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import IconSelect from "../SelectFields/IconSelect";
import * as Yup from "yup";
import "./Modal.css";

const validationSchema = Yup.object({
  selectedFile: Yup.string().required("File selection is required"),
  message: Yup.string().required("Message is required"),
});

const RequestSignatureModal = ({ isOpen, onClose, onRequest, list }) => {
  // Process list to get files uploaded by manager or owner
  const files = list.flatMap((folder) =>
    folder.files.map((file) => ({
      value: file._id,
      label: file.name,
      folderId: folder._id, // include folder ID
    }))
  );

  const initialValues = {
    selectedFile: "",
    selectedFolder: "", // new field for folder ID
    message: "Please take a moment to sign this document.",
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Request Signature</p>
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
            onRequest(values);
            setSubmitting(false);
            onClose();
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
                  label="Select File"
                  name="selectedFile"
                  options={files}
                  onChange={(value) => {
                    const selectedFile = files.find(
                      (file) => file.value === value
                    );
                    setFieldValue("selectedFile", value);
                    setFieldValue("selectedFolder", selectedFile.folderId); // set folder ID
                  }}
                  onBlur={handleBlur}
                  value={values.selectedFile}
                  error={errors.selectedFile && touched.selectedFile}
                />
                <IconInput
                  multiLine
                  width={300}
                  style={{ height: 70, padding: "5px 15px" }}
                  label="Message"
                  type="text"
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  error={errors.message && touched.message}
                />
              </div>
              <footer className="modal-card-foot">
                <button
                  type="submit"
                  className="button button-success"
                  onClick={() => handleSubmit()}
                >
                  Request
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

export default RequestSignatureModal;
