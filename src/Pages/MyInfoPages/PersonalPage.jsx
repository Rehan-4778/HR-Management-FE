import React, { useEffect, useMemo, useState } from "react";
import { FaIdCard, FaTrash } from "react-icons/fa6";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import IconInput from "../../components/InputFields/IconInput";
import IconSelect from "../../components/SelectFields/IconSelect";
import EmployeeDetailTable from "../../components/Tables/EmployeeDetailTable";
import Modal from "../../components/Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addEmployeeField,
  deleteEmployeeField,
  updateEmployeeField,
  updatePersonalInfo,
  uploadProfilePicture,
} from "../../store";
import VisaInfoModal from "../../components/Modals/VisaInfoModal";
import { toast } from "react-toastify";
import countryList from "react-select-country-list";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

const visaTableHeadings = [
  "Date",
  "Visa",
  "Issuing Country",
  "Issued",
  "Expiration",
  "Status",
  "Note",
];

const PersonalPage = ({ newImage }) => {
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const { degree } = useSelector((state) => state?.setting?.employeeFields);

  const personalDetails = useSelector((state) => state?.employee?.userInfo);
  const { employeeId } = useParams();

  const handleSave = async (values) => {
    await dispatch(
      addEmployeeField({
        employeeId,
        companyId: companyId,
        fieldName: "visaInfo",
        fieldValue: values,
      })
    );
  };

  const handleDelete = async (id) => {
    await dispatch(
      deleteEmployeeField({
        employeeId,
        companyId,
        fieldName: "visaInfo",
        fieldId: id,
      })
    );
  };

  const handleEditModal = (values) => {
    setEditItem(values);
    setIsModalOpen(true);
  };

  const handleEdit = async (values) => {
    setIsModalOpen(false);

    let isUpdated = false;

    let newValues = {
      ...values,
      date: new Date(values.date).toISOString(),
      issuedDate:
        values.issuedDate === ""
          ? null
          : new Date(values.issuedDate).toISOString(),
      expirationDate:
        values.expirationDate === ""
          ? null
          : new Date(values.expirationDate).toISOString(),
    };

    Object.keys(values).forEach((key) => {
      if (editItem[key] !== newValues[key]) {
        isUpdated = true;
      }
    });

    if (!isUpdated) {
      setEditItem(null);
    } else {
      await dispatch(
        updateEmployeeField({
          employeeId,
          companyId,
          fieldName: "visaInfo",
          fieldId: editItem._id,
          fieldValue: newValues,
        })
      );
    }
  };

  const [initialValues, setInitialValues] = useState({
    employeeId: personalDetails?.employeeId || "",
    status: personalDetails?.loginAccess ? "active" : "inactive",
    firstName: personalDetails?.firstName || "",
    middleName: personalDetails?.middleName || "",
    lastName: personalDetails?.lastName || "",
    dob: personalDetails?.dob
      ? new Date(personalDetails?.dob).toISOString().split("T")[0]
      : "",
    gender: personalDetails?.gender || "",
    maritalStatus: personalDetails?.maritalStatus || "",
    ssn: personalDetails?.ssn || "",
    street1: personalDetails?.street1 || "",
    street2: personalDetails?.street2 || "",
    city: personalDetails?.city || "",
    state: personalDetails?.state || "",
    zip: personalDetails?.zip || "",
    country: personalDetails?.country || "",
    workPhone: personalDetails?.workPhone || "",
    mobilePhone: personalDetails?.mobilePhone || "",
    workEmail: personalDetails?.workEmail || "",
    homeEmail: personalDetails?.homeEmail || "",
    education: personalDetails?.education || [],
  });

  useEffect(() => {
    setInitialValues({
      employeeId: personalDetails?.employeeId || "",
      status: personalDetails?.loginAccess ? "active" : "inactive",
      firstName: personalDetails?.firstName || "",
      middleName: personalDetails?.middleName || "",
      lastName: personalDetails?.lastName || "",
      dob: personalDetails?.dob
        ? new Date(personalDetails?.dob).toISOString().split("T")[0]
        : "",
      gender: personalDetails?.gender || "",
      maritalStatus: personalDetails?.maritalStatus || "",
      ssn: personalDetails?.ssn || "",
      street1: personalDetails?.street1 || "",
      street2: personalDetails?.street2 || "",
      city: personalDetails?.city || "",
      state: personalDetails?.state || "",
      zip: personalDetails?.zip || "",
      country: personalDetails?.country || "",
      workPhone: personalDetails?.workPhone || "",
      mobilePhone: personalDetails?.mobilePhone || "",
      workEmail: personalDetails?.workEmail || "",
      homeEmail: personalDetails?.homeEmail || "",
      education: personalDetails?.education || [],
    });
  }, [personalDetails]);

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID is required"),
    status: Yup.string().required("Status is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    maritalStatus: Yup.string().required("Marital Status is required"),
    ssn: Yup.string()
      .required("SSN is required")
      .matches(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format"),
    street1: Yup.string().required("Street 1 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip is required"),
    country: Yup.string().required("Country is required"),
    workPhone: Yup.string().required("Work Phone is required"),
    mobilePhone: Yup.string(),
    workEmail: Yup.string().email("Invalid email format"),
    homeEmail: Yup.string(),
    education: Yup.array().of(
      Yup.object().shape({
        institute: Yup.string().required("Institution is required"),
        degree: Yup.string().required("Degree is required"),
        major: Yup.string().required("Major is required"),
        startDate: Yup.date().required("Start Date is required"),
        endDate: Yup.date(),
        gpa: Yup.number().required("GPA is required"),
      })
    ),
  });

  const onSubmit = async (values) => {
    const response = await dispatch(
      updatePersonalInfo({ employeeId, companyId, personalInfo: values })
    );

    if (response.payload.success) {
      toast.success("Profile updated successfully");
    }
  };

  const isFormUpdated = (values) => {
    // console.log("values", values);
    // console.log("initialValues", initialValues);
    let isUpdated = false;

    Object.keys(values).forEach((key) => {
      if (key !== "education" && initialValues[key] !== values[key]) {
        isUpdated = true;
        console.log("key", key, "updated here", isUpdated);
      }
    });

    if (initialValues.education.length !== values.education.length) {
      isUpdated = true;
    } else {
      initialValues?.education?.forEach((edu, index) => {
        Object.keys(edu).forEach((key) => {
          if (edu[key] !== values.education[index][key]) {
            isUpdated = true;
          }
        });
      });
    }

    return isUpdated;
  };

  const handleUploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("companyId", companyId);

    const response = await dispatch(
      uploadProfilePicture({
        employeeId,
        formData,
        // companyId,
        // image: JSON.stringify(newImage),
      })
    );

    if (response.payload.success) {
      toast.success("Profile picture updated successfully");
    }
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
            enableReinitialize
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
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
                  <IconSelect
                    width={150}
                    label="Status"
                    name="status"
                    options={[
                      { value: "", label: "--Select--" },
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                    onChange={(value) => setFieldValue("status", value)}
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
                    onChange={(value) => setFieldValue("gender", value)}
                    onBlur={handleBlur}
                    value={values.gender}
                    error={errors.gender && touched.gender}
                  />
                  <IconSelect
                    width={200}
                    label="Marital Status"
                    name="maritalStatus"
                    options={maritalStatusOptions}
                    onChange={(value) => setFieldValue("maritalStatus", value)}
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
                  placeholder="xxx-xx-xxxx"
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
                    <IconSelect
                      width={200}
                      label={"Country"}
                      name={"country"}
                      value={values.country}
                      onChange={(val) => {
                        setFieldValue("country", val);
                      }}
                      onBlur={handleBlur}
                      error={errors.country && touched.country}
                      options={[
                        { label: "Select Country", value: "" },
                        ...countryOptions,
                      ]}
                      labelAsValue={true}
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
                              name={`education.${index}.institute`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={edu.institute}
                              error={
                                errors.education &&
                                errors.education[index] &&
                                errors.education[index].institute &&
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].institute
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
                              options={degree?.map((deg) => ({
                                label: deg.label,
                                value: deg.value,
                              }))}
                              onChange={(value) => {
                                setFieldValue(
                                  `education.${index}.degree`,
                                  value
                                );
                              }}
                              onBlur={handleBlur}
                              value={edu?.degree}
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
                              value={
                                edu.startDate
                                  ? new Date(edu.startDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : edu.startDate
                              }
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
                              value={
                                edu.endDate
                                  ? new Date(edu.endDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : edu.endDate
                              }
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
                            institute: "",
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
                <div className="w-full border my-5" />
                <div className="mt-5 mb-3 flex justify-between">
                  <div className=" flex items-center gap-3">
                    <FaIdCard size={22} color="green" />
                    <h2 className="text-lg font-semibold">Visa Information</h2>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-500"
                    onClick={() => setIsModalOpen(true)}
                  >
                    + Add Entry
                  </button>
                </div>
                <EmployeeDetailTable
                  headings={visaTableHeadings}
                  list={personalDetails?.visaInfo || []}
                  allowDelete
                  allowEdit
                  onDelete={handleDelete}
                  onEdit={handleEditModal}
                  isFixedValue={true}
                />
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <VisaInfoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    onEdit={handleEdit}
                    visaInfo={editItem}
                  />
                </Modal>
                {(isFormUpdated(values) || newImage) && (
                  <div className="-ml-10 mt-10 fixed bottom-0 bg-white border-t border-gray-300 w-full h-20 flex items-center z-10">
                    {isFormUpdated(values) && (
                      <button
                        type="submit"
                        className=" bg-green1 text-white py-2 rounded-sm text-sm font-medium px-4 mx-5"
                      >
                        Update Profile
                      </button>
                    )}
                    {newImage && (
                      <button
                        type="button"
                        className=" bg-green1 text-white py-2 rounded-sm text-sm font-medium px-4 mx-5"
                        onClick={handleUploadProfileImage}
                      >
                        Update Profile Picture
                      </button>
                    )}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
