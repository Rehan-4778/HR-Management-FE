import React from "react";
import { Formik } from "formik";
import Input from "../../components/InputFields/Input";
import Button from "../../components/Buttons/Button";
import signInSchema from "../../formik/schemas/signInSchema";
import Spacer from "../../components/Custom/Spacer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onboardLogin } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OnboardLogin = () => {
  const location = useLocation();
  const baseUrl = location.pathname.split("/login")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md mx-4 sm:mx-0">
          <div className="bg-white py-10 px-6 sm:px-12 rounded shadow-md">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center select-none">
              Sign In
            </h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validateOnBlur={true}
              validationSchema={signInSchema}
              onSubmit={async (values) => {
                const response = await dispatch(onboardLogin(values));

                if (response?.payload?.success) {
                  toast.success(response?.payload?.message);
                  navigate(`${baseUrl}`);
                } else if (response?.error) {
                  toast.error(response?.error?.message);
                }
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                handleBlur,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
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

                  <Link
                    to="/forgot-password"
                    className="text-primary block -mt-2 text-sm text-right hover:text-green1 transition duration-300 ease-in-out"
                  >
                    Forgot Password?
                  </Link>

                  <Spacer height="1.25rem" />
                  <Button
                    type="submit"
                    full
                    tertiary
                    classnames="text-white rounded-sm bg-primary hover:bg-green1 transition duration-300 ease-in-out "
                  >
                    Sign In
                  </Button>
                  <Spacer height="1.25rem" />
                  <div className="text-center">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to={`${baseUrl}/signup`}
                        className="text-primary hover:text-green1 font-medium transition duration-300 ease-in-out"
                      >
                        Sign Up
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

export default OnboardLogin;
