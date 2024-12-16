import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "../../components/InputFields/Input";
import Button from "../../components/Buttons/Button";
import Spacer from "../../components/Custom/Spacer";
import { useDispatch } from "react-redux";

import { forgetPassword } from "../../store";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md mx-4 sm:mx-0">
          <div className="bg-white py-10 px-6 sm:px-12 rounded shadow-md">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center select-none">
              Forgot Password
            </h1>
            <Formik
              initialValues={{ email: "" }}
              validateOnBlur={true}
              validationSchema={forgotPasswordSchema}
              onSubmit={async (values) => {
                try {
                  dispatch(showLoading());
                  const response = await dispatch(forgetPassword(values));
                  if (response?.payload?.success) {
                    toast.success(
                      response?.payload?.message || "Reset link sent!"
                    );
                    navigate("/reset-password");
                  } else if (response?.error) {
                    toast.error(
                      response?.error?.message ||
                        "An error occurred. Please try again."
                    );
                  }
                } catch (err) {
                  toast.error(
                    err.message || "An error occurred. Please try again."
                  );
                } finally {
                  dispatch(hideLoading());
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
                  <Spacer height="1.25rem" />
                  <Button
                    type="submit"
                    full
                    tertiary
                    classnames="text-white rounded-sm bg-primary hover:bg-green1 transition duration-300 ease-in-out"
                  >
                    Send Reset Link
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
