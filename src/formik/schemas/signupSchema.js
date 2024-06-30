import * as Yup from "yup";

const signupSchema = Yup.object({
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
  companyName: Yup.string().required("*Company Name is required"),
  domain: Yup.string().required("*Domain is required"),
  jobTitle: Yup.string().required("*Job Title is required"),
  employeeCount: Yup.string().required("*Employee count is required"),
  country: Yup.string().required("*Country is required"),
});

export default signupSchema;
