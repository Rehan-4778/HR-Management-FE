import React from "react";
import { FaBriefcase } from "react-icons/fa6";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import IconInput from "../../components/InputFields/IconInput";
import InfoTable from "../../components/Tables/InfoTable";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const [maritalStatusOptions] = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

const JobPage = () => {
  const initialValues = {
    hireDate: "",
  };

  const validationSchema = Yup.object({
    hireDate: Yup.string(),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <div className="py-5 px-10">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex gap-3 border-b border-gray-400 mb-2">
          <FaBriefcase size={22} color="green" />
          <h2 className="text-lg font-semibold mb-4">Job Page</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <IconInput
                width={150}
                label="Hite Date"
                type="date"
                name="hireDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={errors.lastName && touched.lastName}
              />
              <div>
                <div className="flex gap-3 border-t border-gray-400 my-3 pt-5 ">
                  <FaBriefcase size={22} color="green" />
                  <h2 className="text-lg font-semibold">Employeement Status</h2>
                </div>
                <InfoTable title="Job Information" />
              </div>
              <div>
                <div className="flex gap-3 border-t border-gray-400 my-3 pt-5 ">
                  <FaBriefcase size={22} color="green" />
                  <h2 className="text-lg font-semibold">Job Information</h2>
                </div>
                <InfoTable title="Job Information" />
              </div>
              <div>
                <div className="flex gap-3 border-t border-gray-400 my-3 pt-5 ">
                  <FaBriefcase size={22} color="green" />
                  <h2 className="text-lg font-semibold">Compensation</h2>
                </div>
                <InfoTable title="Job Information" />
              </div>
            </Form>
          )}
        </Formik>
        <div className="mb-6"></div>
      </div>
    </div>
  );
};

export default JobPage;
