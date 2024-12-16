import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "../../components/InputFields/Input";
import Button from "../../components/Buttons/Button";
import Spacer from "../../components/Custom/Spacer";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md mx-4 sm:mx-0">
          <div className="bg-white py-10 px-6 sm:px-12 rounded shadow-md">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center select-none">
              Reset Password
            </h1>
            <Formik
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validateOnBlur={true}
              validationSchema={resetPasswordSchema}
              onSubmit={async (values) => {
                try {
                  dispatch(showLoading());
                  const response = await dispatch(
                    resetPassword({
                      password: values.newPassword,
                      token,
                    })
                  );
                  if (response?.payload?.success) {
                    toast.success(
                      response?.payload?.message ||
                        "Password reset successfully!"
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
                    label={"New Password"}
                    type={"password"}
                    name={"newPassword"}
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={"Enter your new password"}
                    error={
                      errors.newPassword &&
                      touched.newPassword &&
                      errors.newPassword
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
                    placeholder={"Confirm your new password"}
                    error={
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }
                  />
                  <Spacer height="1.25rem" />
                  <Button
                    type="submit"
                    full
                    tertiary
                    classnames="text-white rounded-sm bg-primary hover:bg-green1 transition duration-300 ease-in-out"
                  >
                    Reset Password
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

export default ResetPasswordPage;
