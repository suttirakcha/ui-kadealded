import { object, string } from "yup";

export const contactSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  tel_number:string().min(10,"Number need at least 10").required("Password is required"),
  message:string().optional().required("Message is required")
})