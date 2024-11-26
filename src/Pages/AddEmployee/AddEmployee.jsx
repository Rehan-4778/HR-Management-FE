import React, { useEffect, useState, useRef } from "react";
import IconInput from "../../components/InputFields/IconInput";
import IconSelect from "../../components/SelectFields/IconSelect";
import { GoCheckCircleFill } from "react-icons/go";
import { Formik } from "formik";
import createEmployeeSchema from "../../formik/schemas/createEmployeeSchema";
import { PiProhibitLight } from "react-icons/pi";
import "./AddEmployee.css";
import Modal from "../../components/Modals/Modal";
import Input from "../../components/InputFields/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  getCompanyEmployeeNames,
  sendOnboardingInvite,
} from "../../store";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeEmailError, setEmployeeEmailError] = useState("");
  const [reportsToList, setReportsToList] = useState([]);
  const formikRef = useRef(null);

  const {
    department: departmentOptions,
    division: divisionOptions,
    employmentStatus: employmentStatusOptions,
    jobTitle: jobTitleOptions,
  } = useSelector((state) => state?.setting?.employeeFields);

  const selectedCompany = useSelector((state) => state.auth.selectedCompany);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const getReportsToList = async () => {
    // call the api to get the reportsTo option
    const response = await dispatch(
      getCompanyEmployeeNames({ companyId: selectedCompany.company._id })
    );

    if (response?.payload?.success) {
      const reportsToOptions = response.payload?.data?.map((employee) => ({
        value: employee._id,
        label: `${employee.firstName} ${employee?.middleName} ${employee.lastName}`,
      }));

      setReportsToList(reportsToOptions);
    }
  };

  useEffect(() => {
    if (selectedCompany.company._id) {
      getReportsToList();
    }
  }, [selectedCompany.company._id]);

  const genderOptions = [
    { value: "", label: "--Select--" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const maritalStatusOptions = [
    { value: "", label: "--Select--" },
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  const payScheduleOptions = [
    { value: "", label: "--Select--" },
    { value: "weekly", label: "Weekly" },
    { value: "bi-weekly", label: "Bi-Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const payTypeOptions = [
    { value: "", label: "-Select--" },
    { value: "hourly", label: "Hourly" },
    { value: "salaried", label: "Salaried" },
  ];

  const ethnicityOptions = [
    { value: "", label: "--Select--" },
    { value: "hispanic", label: "Hispanic or Latino" },
    { value: "non-hispanic", label: "Not Hispanic or Latino" },
    { value: "other", label: "Other" },
  ];

  const locationOptions = [
    { value: "", label: "--Select--" },
    { value: "new-york", label: "New York" },
    { value: "california", label: "California" },
  ];

  const handleSubmitEmail = async () => {
    if (employeeEmail.trim() === "") {
      setEmployeeEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeEmail)) {
      setEmployeeEmailError("Invalid email format");
    } else {
      if (formikRef.current) {
        const values = formikRef.current.values;
        let newValues;
        for (let key in values) {
          if (values[key] !== "--Select--" || values[key].trim() !== "") {
            newValues = { ...newValues, [key]: values[key] };
          }
        }

        const response = await dispatch(
          createEmployee({
            companyId: selectedCompany.company._id,
            ...newValues,
          })
        );

        if (response.payload.success) {
          const response2 = await dispatch(
            sendOnboardingInvite({
              email: employeeEmail,
              companyId: selectedCompany.company._id,
              employeeId: response.payload.employeeProfile.employeeId,
            })
          );

          if (response2.payload.success) {
            toast.success("Employee created successfully and email sent");
            setEmployeeEmail("");
            setEmployeeEmailError("");
            setIsModalOpen(false);
            // rest the form
            formikRef.current.resetForm();
          } else {
            toast.error(response2?.payload?.error);
          }
        } else {
          toast.error(response?.payload?.error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white p-10 mt-16">
      <div className="px-4" style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <h1 className="text-3xl font-semibold mb-6 text-primary">
          New Employee
        </h1>

        <div className="flex flex-col mb-6 p-5 rounded bg-gray-100 w-5/6">
          <h2 className="text-lg font-semibold text-green2">Send Hire Email</h2>
          <div className="flex items-start mt-1">
            <input
              type="checkbox"
              className="mt-1"
              id="hire-email"
              name="hire-email"
              onClick={() => setIsEmailSelected(!isEmailSelected)}
            />
            <label htmlFor="hire-email" className="ml-3 ">
              You can send a hire email to the employee to notify them about
              their hiring. Check the box to send the email. You can also send
              the email later.
            </label>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="px-5">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Send Hire Email
            </h2>
            <p className="text-sm text-gray-600">
              Enter the email address of the employee to send the hire email.
            </p>
            <div className="my-5">
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter email address"
                style={{ width: 250 }}
                value={employeeEmail}
                onChange={(e) => {
                  setEmployeeEmail(e.target.value);
                  if (
                    e.target.value.trim() !== "" &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                  ) {
                    setEmployeeEmailError("");
                  }
                }}
                error={employeeEmailError}
              />
            </div>

            <div className="flex gap-4 mt-2">
              <button
                className="bg-primary text-white px-5 h-[35px] rounded font-medium"
                onClick={handleSubmitEmail}
              >
                Send
              </button>
              <button
                className="text-danger h-[35px] rounded font-medium"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* implemet using formik */}
        <Formik
          innerRef={formikRef}
          initialValues={{
            employeeId: "",
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
            paySchedule: "",
            payType: "",
            payRate: "",
            payRateUnit: "",
            ethnicity: "",
            workPhone: "",
            mobilePhone: "",
            workEmail: "",
            homeEmail: "",
            hiringDate: "",
            employmentStatus: "",
            jobTitle: "",
            reportsTo: "",
            department: "",
            division: "",
            location: "",
            loginAccess: false,
          }}
          validationSchema={createEmployeeSchema}
          onSubmit={async (values) => {
            // keep the selects with value --Select-- from being sent to the server
            let newValues;
            for (let key in values) {
              if (values[key] !== "--Select--" || values[key].trim() !== "") {
                newValues = { ...newValues, [key]: values[key] };
              }
            }

            // Send the form data to the server
            const response = await dispatch(
              createEmployee({
                companyId: selectedCompany.company._id,
                ...newValues,
              })
            );

            // Handle the response
            if (response.payload.success) {
              toast.success("Employee created successfully");
              // reset the form
              formikRef.current.resetForm();
            } else {
              toast.error(response?.payload?.error);
            }
          }}
        >
          {({
            handleSubmit,
            values,
            setFieldValue,
            handleChange,
            handleBlur,
            errors,
            touched,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* Section 1: Personal */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Personal</h2>
                <IconInput
                  width={150}
                  label="Employee ID"
                  type="text"
                  name="employeeId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.employeeId}
                  error={errors.employeeId && touched.employeeId}
                />

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
              </div>

              {/* Section 2: Address */}
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
                </div>
                <div className="flex gap-3">
                  <IconInput
                    width={150}
                    label="Zip"
                    type="text"
                    name="zip"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zip}
                    error={errors.zip && touched.zip}
                  />
                  <IconInput
                    width={150}
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

              {/* Section 3: Compensation */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Compensation</h2>
                <div className="flex gap-3">
                  <IconSelect
                    width={250}
                    label="Pay Schedule"
                    name="paySchedule"
                    options={payScheduleOptions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.paySchedule}
                    error={errors.paySchedule && touched.paySchedule}
                  />
                  <IconSelect
                    width={250}
                    label="Pay Type"
                    name="payType"
                    options={payTypeOptions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payType}
                    error={errors.payType && touched.payType}
                  />
                </div>
                <div className="flex">
                  <IconInput
                    label="Pay Rate"
                    type="text"
                    name="payRate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payRate}
                    error={errors.payRate && touched.payRate}
                  />
                  <div className="flex mt-5">
                    <p className="text-sm mt-3 mx-4 text-gray-500">per</p>
                    <IconSelect
                      width={200}
                      name="payRateUnit"
                      options={payScheduleOptions}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.payRateUnit}
                      error={errors.payRateUnit && touched.payRateUnit}
                    />
                  </div>
                </div>
                <IconSelect
                  width={250}
                  label="Ethnicity"
                  name="ethnicity"
                  options={ethnicityOptions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ethnicity}
                  error={errors.ethnicity && touched.ethnicity}
                />
              </div>

              {/* Section 4: Contact */}
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

              {/* Section 5: Job */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Job</h2>
                <IconInput
                  width={150}
                  label="Hiring Date"
                  type="date"
                  name="hiringDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hiringDate}
                  error={errors.hiringDate && touched.hiringDate}
                />
              </div>

              {/* Section 6: Employment Status */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  Employment Status
                </h2>
                <IconSelect
                  width={250}
                  name="employmentStatus"
                  options={employmentStatusOptions}
                  onChange={(value) => {
                    setFieldValue("employmentStatus", value);
                  }}
                  onBlur={handleBlur}
                  value={values.employmentStatus}
                  error={errors.employmentStatus && touched.employmentStatus}
                />
              </div>

              {/* Section 7: Job Information */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Job Information</h2>
                <div className="flex gap-3">
                  <IconSelect
                    width={200}
                    label="Job Title"
                    name="jobTitle"
                    options={jobTitleOptions}
                    onChange={(value) => {
                      setFieldValue("jobTitle", value);
                    }}
                    onBlur={handleBlur}
                    value={values.jobTitle}
                    error={errors.jobTitle && touched.jobTitle}
                  />
                  <IconSelect
                    width={200}
                    label="Reports To"
                    name="reportsTo"
                    options={reportsToList}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reportsTo}
                    error={errors.reportsTo && touched.reportsTo}
                  />
                </div>
                <div className="flex gap-3">
                  <IconSelect
                    width={200}
                    label="Department"
                    name="department"
                    options={departmentOptions}
                    onChange={(value) => {
                      setFieldValue("department", value);
                    }}
                    onBlur={handleBlur}
                    value={values.department}
                    error={errors.department && touched.department}
                  />
                  <IconSelect
                    width={200}
                    label="Division"
                    name="division"
                    options={divisionOptions}
                    onChange={(value) => {
                      setFieldValue("division", value);
                    }}
                    onBlur={handleBlur}
                    value={values.division}
                    error={errors.division && touched.division}
                  />
                </div>
                <IconInput
                  width={200}
                  label="Location"
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  error={errors.location && touched.location}
                />
              </div>

              {/* Section: Self-service access */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold mb-4">
                  Self-service access
                </h2>
                <div className="flex gap-4 w-2/3">
                  <div
                    className={`access-box ${values.access && "active"}`}
                    onClick={() => {
                      setFieldValue("access", true);
                    }}
                  >
                    <span className="mr-2 mt-1">
                      <GoCheckCircleFill
                        size={25}
                        color={values.access ? "green" : "#111"}
                      />
                    </span>
                    <div>
                      <h3 className="font-semibold">
                        Allow Access to BambooHR
                      </h3>
                      <p className="text-sm mt-1 w-11/12 select-none">
                        They will be able to login to HR System using the access
                        level you choose.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`access-box ${!values.access && "active"}`}
                    onClick={() => setFieldValue("access", false)}
                  >
                    <span className="mr-2 mt-1">
                      <PiProhibitLight
                        size={25}
                        color={values.access ? "#111" : "green"}
                      />
                    </span>
                    <div>
                      <h3 className="font-semibold">No Access</h3>
                      <p className="text-sm mt-1 w-11/12 select-none">
                        They won't have access and will not be able to login to
                        HR System.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="fixed bottom-0 left-0 right-0 bg-white px-10 py-5 shadow flex justify-start space-x-4 border-t">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 h-[38px] rounded font-medium"
                >
                  Save
                </button>
                {isEmailSelected && (
                  <button
                    type="button"
                    className="border-[1.5px] px-5 h-[38px] border-primary rounded text-primary font-medium"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Save and Send Hire Email
                  </button>
                )}
                <button
                  className="text-danger h-[38px] rounded font-medium"
                  onClick={() => resetForm()}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;
