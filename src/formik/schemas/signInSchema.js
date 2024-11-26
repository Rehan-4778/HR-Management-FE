import * as Yup from "yup";

const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("*Email is required"),
  password: Yup.string().required("Password is required"),
});

export default signInSchema;
