import React, { useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IconInput from "../../../components/InputFields/IconInput"; // Adjust the import path based on your project structure
import IconSelect from "../../../components/SelectFields/IconSelect"; // Adjust the import path based on your project structure
import { FaSave, FaUpload } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanyInfo } from "../../../store";
import { toast } from "react-toastify";
import countryList from "react-select-country-list";

const CompanyInfoPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isProfilePicHovered, setIsProfilePicHovered] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const countryOptions = useMemo(() => countryList().getData(), []);

  const selectedCompany = useSelector((state) => state?.auth?.selectedCompany);
  const employeesList = useSelector((state) => state?.employee?.reportsToList);
  const { owner: ownerId, employees } = useSelector(
    (state) => state?.setting?.companyInfo
  );

  console.log("selectedCompany", selectedCompany);

  const [initialValues, setInitialValues] = useState({
    companyImage: selectedCompany?.company?.image || "",
    ownerName: ownerId,
    companyName: selectedCompany?.company?.name || "",
    employeesCount: selectedCompany?.company?.employeeCount || "",
    country: selectedCompany?.company?.country || "",
  });

  const validationSchema = Yup.object({
    ownerName: Yup.string().required("Owner name is required"),
    companyName: Yup.string().required("Company name is required"),
    employeesCount: Yup.string().required("Employees count is required"),
    country: Yup.string().required("Country is required"),
  });

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setProfilePicFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-xl mb-4 font-medium">Company Information</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (!isEditing) {
            setIsEditing(true);
            return;
          }

          let formData = new FormData();
          // make an array of updated fields

          if (
            profilePic ||
            initialValues.ownerName !== values.ownerName ||
            initialValues.companyName !== values.companyName ||
            initialValues.employeesCount !== values.employeesCount ||
            initialValues.country !== values.country
          ) {
            if (profilePic) {
              formData.append("image", profilePicFile);
            }

            formData.append("owner", values.ownerName);
            formData.append("name", values.companyName);
            formData.append("employeeCount", values.employeesCount);
            formData.append("country", values.country);

            if (values.image) {
              formData.append("image", values.image); // Assuming values.image is a File object
            }

            const response = await dispatch(
              updateCompanyInfo({
                companyId: selectedCompany?.company?._id,
                formData,
              })
            );

            if (response?.payload?.success) {
              toast.success("Company information updated successfully");
            }

            setIsEditing(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex justify-between items-start">
              <div className="relative rounded-full w-28 h-28 border-[3px] my-8">
                <div
                  className="absolute w-[100%] h-[100%]"
                  onMouseEnter={() => setIsProfilePicHovered(true)}
                  onMouseLeave={() => setIsProfilePicHovered(false)}
                >
                  <img
                    src={
                      profilePic ||
                      selectedCompany?.company?.image ||
                      "https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-office-icon-png-image_4171301.jpg"
                    }
                    loading="lazy"
                    alt="User"
                    quality="50"
                    className="w-full h-full rounded-full object-contain"
                  />

                  {isProfilePicHovered && isEditing && (
                    <div
                      className="absolute inset-0 bg-black opacity-70 rounded-full flex justify-center items-center cursor-pointer"
                      onClick={() => fileRef.current.click()}
                    >
                      <FaUpload className="mb-2" color="#fff" />
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    ref={fileRef}
                    onChange={handleProfilePicChange}
                  />
                </div>
              </div>
              {selectedCompany?.profile?._id === ownerId && (
                <>
                  {isEditing ? (
                    <button
                      className="flex items-center px-4 py-2 bg-green1 rounded-sm"
                      type="submit"
                    >
                      <FaSave className="mr-2 text-white" />
                      <span className="font-medium text-white">Update</span>
                    </button>
                  ) : (
                    <button className="flex items-center px-4 py-2 bg-gray-300 rounded-sm">
                      <FaPencil className="mr-2 text-gray-700" />
                      <span className="font-medium text-gray-700">Edit</span>
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <IconSelect
                width={230}
                label="Owner Name"
                type="text"
                name="ownerName"
                onChange={(value) => setFieldValue("ownerName", value)}
                onBlur={handleBlur}
                options={employeesList.map((employee) => ({
                  value: employee._id,
                  label: employee?.firstName + " " + employee?.lastName,
                }))}
                value={values.ownerName}
                error={touched.ownerName && errors.ownerName}
                disabled={!isEditing}
              />
              <IconInput
                width={230}
                label="Company Name"
                type="text"
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName || ownerId}
                error={touched.companyName && errors.companyName}
                disabled={!isEditing}
              />
              <div className="flex gap-5">
                <IconSelect
                  width={220}
                  label="Company Country"
                  type="text"
                  name="country"
                  onChange={(value) => setFieldValue("country", value)}
                  options={[
                    { label: "Select Country", value: "" },
                    ...countryOptions,
                  ]}
                  labelAsValue={true}
                  onBlur={handleBlur}
                  value={values.country}
                  error={touched.country && errors.country}
                  disabled={!isEditing}
                />
                <IconSelect
                  width={200}
                  label="Company Employees Count"
                  type="number"
                  name="employeesCount"
                  options={[
                    { value: "", label: "Select..." },
                    { value: "1-10", label: "1-10" },
                    { value: "11-50", label: "11-50" },
                    { value: "51-200", label: "51-200" },
                    { value: "201-500", label: "201-500" },
                    { value: "501-1000", label: "501-1000" },
                    { value: "1000+", label: "1000+" },
                  ]}
                  onChange={(value) => setFieldValue("employeesCount", value)}
                  onBlur={handleBlur}
                  value={values.employeesCount}
                  error={touched.employeesCount && errors.employeesCount}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyInfoPage;
