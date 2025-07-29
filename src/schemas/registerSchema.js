import { date, object, ref, string } from "yup";

export const registerSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string().min(6).required("Password is required"),
  confirmPassword : string().oneOf([ref("password"), null], "Password does not match").required("Confirm password is required"),
  birth_date: date().optional()
})