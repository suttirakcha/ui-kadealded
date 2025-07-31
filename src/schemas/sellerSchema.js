import { object, string } from "yup";

export const sellerSchema = object({
  name: string().required("Company is required"),
  email: string().email("Invalid email").required("Email is required"),
  tel_number:string().min(10,"Number need at least 10").required("Password is required")
})