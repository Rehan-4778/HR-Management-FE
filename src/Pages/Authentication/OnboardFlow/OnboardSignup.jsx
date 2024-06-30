import { Formik } from "formik";
import signupSchema from "../../../formik/schemas/signupSchema";
import Spacer from "../../../components/Custom/Spacer";
import Input from "../../../components/InputFields/Input";
import Button from "../../../components/Buttons/Button";
import onboardSignupSchema from "../../../formik/schemas/onboardSignupSchema";
import { Link } from "react-router-dom";

const OnboardSignupPage = () => {
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
              }}
              validateOnBlur={true}
              validationSchema={onboardSignupSchema}
              onSubmit={(values) => {
                if (values.country === "Select...") {
                  setFieldError("country", "*Please select a country");
                }
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                setFieldError,
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
                        to="/onboard/login"
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

export default OnboardSignupPage;
