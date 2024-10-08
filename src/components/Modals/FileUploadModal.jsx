import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FileUploadModal = ({ isOpen, onClose, onSave }) => {
  const [filePreview, setFilePreview] = useState(null);

  const validationSchema = Yup.object({
    file: Yup.mixed().required("A file is required"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("file", file);

    if (file) {
      const reader = new FileReader();

      console.log(file);
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
          <header className="flex justify-between items-center px-4 py-2 border-b">
            <h2 className="text-xl font-semibold">Upload File</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </header>
          <Formik
            initialValues={{ file: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(";here");
              setSubmitting(true);
              onSave(values.file);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ setFieldValue, isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Choose File
                    </label>
                    <input
                      type="file"
                      name="file"
                      className="mt-1 block w-full"
                      onChange={(event) =>
                        handleFileChange(event, setFieldValue)
                      }
                    />
                    <ErrorMessage
                      name="file"
                      component="div"
                      className="mt-1 text-red-500 text-sm"
                    />
                  </div>
                  {filePreview && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Preview
                      </label>
                      <img
                        src={filePreview}
                        alt="File Preview"
                        className="mt-1 max-h-48 max-w-28 w-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <footer className="flex justify-end px-4 py-2 border-t">
                  <button
                    type="submit"
                    className="button button-success"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Uploading..." : "Upload"}
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
    </div>
  );
};

export default FileUploadModal;
