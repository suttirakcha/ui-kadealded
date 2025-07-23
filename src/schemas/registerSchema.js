import { object, string } from "yup";

// Mockup register, will integrate with backend later
export const registerSchema = object({
  username: string(),
  email: string(),
  password: string()
})