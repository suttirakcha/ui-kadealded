import { object, string } from "yup";

export const loginSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string().min(6).required("Password is required"),
})