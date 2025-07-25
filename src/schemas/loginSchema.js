import { object, string } from "yup";

// Mockup login, will integrate with backend later
export const loginSchema = object({
  email: string(),
  password: string()
})