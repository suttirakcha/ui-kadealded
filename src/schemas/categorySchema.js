import { object, string } from "yup";

export const categorySchema = object({
  name: string().required("Name is required"),
  notes: string().optional()
})