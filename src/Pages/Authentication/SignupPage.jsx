import { Formik } from "formik";
import signupSchema from "../../formik/schemas/signupSchema";
import Spacer from "../../components/Custom/Spacer";
import Input from "../../components/InputFields/Input";
import Button from "../../components/Buttons/Button";
import Select from "../../components/InputFields/Select";
import { Link } from "react-router-dom";
import { signup } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-md mx-4 sm:mx-0">
          <div className="bg-white py-10 px-6 sm:px-10 rounded shadow-md">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center select-none">
              Sign Up
            </h1>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                jobTitle: "",
                companyName: "",
                domain: "",
                employeeCount: "",
                country: "",
              }}
              validateOnBlur={true}
              validationSchema={signupSchema}
              onSubmit={async (values, { resetForm }) => {
                const { confirmPassword, ...rest } = values;

                try {
                  dispatch(showLoading());
                  const response = await dispatch(signup(rest));

                  if (response?.payload?.success) {
                    navigate("/login/select-company");
                    toast.success(response?.payload?.message);
                    resetForm();
                  } else {
                    toast.error(response?.payload?.error);
                  }
                } catch (error) {
                  toast.error("An error occurred. Please try again.");
                  console.log(error);
                } finally {
                  dispatch(hideLoading(false));
                }
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                setFieldValue,
                handleBlur,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex">
                    <Input
                      label={"First Name"}
                      type={"text"}
                      name={"firstName"}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your first name"}
                      error={
                        errors.firstName &&
                        touched.firstName &&
                        errors.firstName
                      }
                    />
                    <Spacer width="2rem" />
                    <Input
                      label={"Last Name"}
                      type={"text"}
                      name={"lastName"}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your last name"}
                      error={
                        errors.lastName && touched.lastName && errors.lastName
                      }
                    />
                  </div>
                  <Spacer height="0.3rem" />
                  <Input
                    label={"Email"}
                    type={"email"}
                    name={"email"}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={"Enter your email"}
                    error={errors.email && touched.email && errors.email}
                  />
                  <Spacer height="0.3rem" />
                  <Input
                    label={"Password"}
                    type={"password"}
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={"Enter your password"}
                    error={
                      errors.password && touched.password && errors.password
                    }
                  />
                  <Spacer height="0.3rem" />
                  <Input
                    label={"Confirm Password"}
                    type={"password"}
                    name={"confirmPassword"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={"Confirm your password"}
                    error={
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }
                  />

                  <Spacer height="0.3rem" />
                  <div className="flex">
                    <Input
                      label={"Phone"}
                      type={"text"}
                      name={"phone"}
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your phone number"}
                      error={errors.phone && touched.phone && errors.phone}
                    />
                    <Spacer width="2rem" />
                    <Input
                      label={"Job Title"}
                      type={"text"}
                      name={"jobTitle"}
                      value={values.jobTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your job title"}
                      error={
                        errors.jobTitle && touched.jobTitle && errors.jobTitle
                      }
                    />
                  </div>
                  <Spacer height="0.3rem" />
                  <Input
                    label={"Company Name"}
                    type={"text"}
                    name={"companyName"}
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={"Enter your company name"}
                    error={
                      errors.companyName &&
                      touched.companyName &&
                      errors.companyName
                    }
                  />
                  <Spacer height="0.3rem" />
                  <div className="flex items-center">
                    <Input
                      className={"w-1/2"}
                      label={"Company Domain"}
                      type={"text"}
                      name={"domain"}
                      value={values.domain}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your company domain"}
                      error={errors.domain && touched.domain && errors.domain}
                    />
                    <Spacer width="2rem" />
                    <Select
                      className="w-1/2"
                      label={"Employee Count"}
                      name={"employeeCount"}
                      value={values.employeeCount}
                      onChange={(val) => setFieldValue("employeeCount", val)}
                      onBlur={handleBlur}
                      error={
                        errors.employeeCount &&
                        touched.employeeCount &&
                        errors.employeeCount
                      }
                      options={[
                        { value: "", label: "Select..." },
                        { value: "1-10", label: "1-10" },
                        { value: "11-50", label: "11-50" },
                        { value: "51-200", label: "51-200" },
                        { value: "201-500", label: "201-500" },
                        { value: "501-1000", label: "501-1000" },
                        { value: "1000+", label: "1000+" },
                      ]}
                    />
                  </div>
                  <Spacer height="0.3rem" />
                  <Select
                    label={"Country"}
                    name={"country"}
                    value={values.country}
                    onChange={(val) => setFieldValue("country", val)}
                    onBlur={handleBlur}
                    error={errors.country && touched.country && errors.country}
                    options={[
                      { value: "", label: "Select..." },
                      { value: "Nigeria", label: "Nigeria" },
                      { value: "Ghana", label: "Ghana" },
                      { value: "Kenya", label: "Kenya" },
                      { value: "South Africa", label: "South Africa" },
                    ]}
                  />

                  <Spacer height="0.3rem" />
                  <div>
                    <p className="text-xs text-gray-500">
                      By clicking the Sign Up button, you agree to our{" "}
                      <a
                        href="#"
                        className="text-primary hover:text-green1 underline transition duration-300 ease-in-out"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-primary hover:text-green1 underline transition duration-300 ease-in-out"
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                  <Spacer height="1.25rem" />
                  <Button
                    type="submit"
                    full
                    tertiary
                    classnames="text-white rounded-sm bg-primary hover:bg-green1 transition duration-300 ease-in-out "
                  >
                    Sign Up
                  </Button>
                  <Spacer height="1.25rem" />
                  <div className="text-center">
                    <p className="text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:text-green1 font-medium transition duration-300 ease-in-out"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
