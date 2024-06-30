import * as Yup from "yup";

const onboardSignupSchema = Yup.object({
  firstName: Yup.string().required("*First name is required"),
  lastName: Yup.string().required("*Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("*Email is required"),
  password: Yup.string()
    .required("*Password is required")
    .min(8, "*Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("*Confirm password is required")
    .oneOf([Yup.ref("password"), null], "*Passwords must match"),
  phone: Yup.string().required("*Phone is required"),
});

export default onboardSignupSchema;
