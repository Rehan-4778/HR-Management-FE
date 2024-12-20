import React from "react";
import { Formik, Form } from "formik";
import IconInput from "../InputFields/IconInput";
import * as Yup from "yup";
import "./Modal.css";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .max(500, "Description cannot exceed 2000 characters")
    .required("Description is required"),
});

const AnnouncementModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  announcement,
}) => {
  const initialValues = announcement
    ? {
        title: announcement.title || "",
        description: announcement.description || "",
      }
    : {
        title: "",
        description: "",
      };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title pe-5">
            {announcement ? "Edit Announcement" : "Add Announcement"}
          </p>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            if (announcement) {
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
                    width={300}
                    label="Title"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={errors.title && touched.title && errors.title}
                  />
                </div>
                <div className="form-group my-2">
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
                    error={
                      errors.description &&
                      touched.description &&
                      errors.description
                    }
                  />
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

export default AnnouncementModal;
