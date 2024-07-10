import React from "react";
import { FaIdCard, FaTrash } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import IconInput from "../../components/InputFields/IconInput";
import IconSelect from "../../components/SelectFields/IconSelect";
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

const PersonalPage = () => {
  const initialValues = {
    employeeId: "",
    status: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    ssn: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    workPhone: "",
    mobilePhone: "",
    workEmail: "",
    homeEmail: "",
    education: [
      {
        institution: "abc",
        degree: "bachelors",
        major: "abc",
        startDate: "12/12/2012",
        endDate: "12/12/2016",
        gpa: "3.5",
      },
    ],
  };

  const degreeOptions = [
    { value: "highschool", label: "High School" },
    { value: "associates", label: "Associates" },
    { value: "bachelors", label: "Bachelors" },
    { value: "masters", label: "Masters" },
    { value: "phd", label: "PhD" },
  ];

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    maritalStatus: Yup.string().required("Marital Status is required"),
    ssn: Yup.string()
      .required("SSN is required")
      .matches(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <div className="py-5 px-10">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex gap-3 border-b border-gray-400 mb-2">
          <FaIdCard size={22} color="green" />
          <h2 className="text-lg font-semibold mb-4">Personal</h2>
        </div>
        <div className="flex gap-3 mb-2">
          <FaIdCard size={22} color="green" />
          <h2 className="text-md font-medium">Basic Information</h2>
        </div>
        <div className="mb-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <Form>
                <div className="flex gap-3">
                  <IconInput
                    width={150}
                    label="Employee #"
                    type="text"
                    name="employeeId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.employeeId}
                    error={errors.employeeId && touched.employeeId}
                  />
                  <IconInput
                    width={150}
                    label="Status"
                    type="text"
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    error={errors.status && touched.status}
                  />
                </div>
                <div className="flex gap-3">
                  <IconInput
                    width={150}
                    label="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    error={errors.firstName && touched.firstName}
                  />
                  <IconInput
                    width={150}
                    label="Middle Name"
                    type="text"
                    name="middleName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.middleName}
                    error={errors.middleName && touched.middleName}
                  />
                  <IconInput
                    width={150}
                    label="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    error={errors.lastName && touched.lastName}
                  />
                </div>
                <div className="flex gap-3">
                  <IconInput
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dob}
                    error={errors.dob && touched.dob}
                  />
                  <IconSelect
                    width={200}
                    label="Gender"
                    name="gender"
                    options={genderOptions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    error={errors.gender && touched.gender}
                  />
                  <IconSelect
                    width={200}
                    label="Marital Status"
                    name="maritalStatus"
                    options={maritalStatusOptions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maritalStatus}
                    error={errors.maritalStatus && touched.maritalStatus}
                  />
                </div>
                <IconInput
                  width={150}
                  label="SSN"
                  type="text"
                  name="ssn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ssn}
                  error={errors.ssn && touched.ssn}
                />

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Address</h2>
                  <IconInput
                    width={310}
                    label="Street 1"
                    type="text"
                    name="street1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street1}
                    error={errors.street1 && touched.street1}
                  />
                  <IconInput
                    width={310}
                    label="Street 2"
                    type="text"
                    name="street2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street2}
                    error={errors.street2 && touched.street2}
                  />
                  <div className="flex gap-3">
                    <IconInput
                      width={150}
                      label="City"
                      type="text"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      error={errors.city && touched.city}
                    />
                    <IconInput
                      width={150}
                      label="State"
                      type="text"
                      name="state"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                      error={errors.state && touched.state}
                    />
                    <IconInput
                      width={100}
                      label="Zip"
                      type="text"
                      name="zip"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zip}
                      error={errors.zip && touched.zip}
                    />
                  </div>
                  <div className="flex gap-3">
                    <IconInput
                      width={200}
                      label="Country"
                      type="text"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      error={errors.country && touched.country}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Contact</h2>
                  <div className="flex gap-3">
                    <IconInput
                      width={200}
                      label="Work Phone"
                      type="text"
                      name="workPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.workPhone}
                      error={errors.workPhone && touched.workPhone}
                    />
                    <IconInput
                      width={200}
                      label="Mobile Phone"
                      type="text"
                      name="mobilePhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobilePhone}
                      error={errors.mobilePhone && touched.mobilePhone}
                    />
                  </div>
                  <div className="flex gap-3">
                    <IconInput
                      width={250}
                      label="Work Email"
                      type="email"
                      name="workEmail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.workEmail}
                      error={errors.workEmail && touched.workEmail}
                    />
                    <IconInput
                      width={250}
                      label="Home Email"
                      type="email"
                      name="homeEmail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.homeEmail}
                      error={errors.homeEmail && touched.homeEmail}
                    />
                  </div>
                </div>

                <h2 className="text-lg font-semibold">Education</h2>
                <FieldArray name="education">
                  {({ insert, remove, push }) => (
                    <div>
                      {values?.education?.map((edu, index) => (
                        <div key={index} className="mb-4  p-4">
                          <div className="flex justify-between items-center">
                            <IconInput
                              width={300}
                              label="College/Institution"
                              type="text"
                              name={`education.${index}.institution`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={edu.institution}
                              error={
                                errors.education &&
                                errors.education[index] &&
                                errors.education[index].institution &&
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].institution
                              }
                            />
                            <button
                              type="button"
                              className="text-gray-500 hover:text-black hover:border p-2"
                              onClick={() => remove(index)}
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>

                          <div className="flex gap-3">
                            <IconSelect
                              width={150}
                              label="Degree"
                              name={`education.${index}.degree`}
                              options={degreeOptions}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={edu.degree}
                              error={
                                errors.education &&
                                errors.education[index] &&
                                errors.education[index].degree &&
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].degree
                              }
                            />

                            <IconInput
                              width={200}
                              label="Major/Specialization"
                              type="text"
                              name={`education.${index}.major`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={edu.major}
                              error={
                                errors.education &&
                                errors.education[index] &&
                                errors.education[index].major &&
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].major
                              }
                            />

                            <IconInput
                              width={100}
                              label="GPA"
                              type="number"
                              name={`education.${index}.gpa`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={edu.gpa}
                              error={
                                errors.education &&
                                errors.education[index] &&
                                errors.education[index].gpa &&
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].gpa
                              }
                            />
                          </div>

                          <div className="flex gap-3">
                            <IconInput
                              label="Start Date"
                              type="date"
                              name={`education.${index}.startDate`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={edu.startDate}
                              error={
                                errors.education &&
                                errors.education[index] &&
                                errors.education[index].startDate &&
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].startDate
                              }
                            />

                            <IconInput
                              label="End Date"
                              type="date"
                              name={`education.${index}.endDate`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={edu.endDate}
                              error={
                                errors.education &&
                                errors.education[index] &&
                                errors.education[index].endDate &&
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].endDate
                              }
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-blue-500"
                        onClick={() =>
                          push({
                            institution: "",
                            degree: "",
                            major: "",
                            startDate: "",
                            endDate: "",
                            gpa: "",
                          })
                        }
                      >
                        + Add Education
                      </button>
                    </div>
                  )}
                </FieldArray>

                <InfoTable />
                <div className="mt-10">
                  <button
                    type="submit"
                    className=" bg-green1 text-white p-2 rounded-sm text-sm px-3"
                  >
                    Update Profile
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
