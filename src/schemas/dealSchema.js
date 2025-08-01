import { date, object, string } from "yup";

export const dealSchema = object({
  title: string().min(5,"Title need at least 5").required("Title is required"),
  category: string().required("Please select category"),
  status:string().required("Please select status"),
  seller:string().required("Please select seller"),
  description:string().optional(),
  start_at: date().required("Start Date required"),
  deadline: date().required("Deadline Date required"),
  images: string().required("Image required")
})