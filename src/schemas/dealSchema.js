import { date, object, string } from "yup";

export const dealSchema = object({
  title: string().required("Title is required"),
  category: string().required("Category is required"),
  status:string().required("Status is required"),
  seller:string().required("Seller is required"),
  description:string().required("Desciption is required"),
  start_date: date().required("Start Date required"),
  deadline: date().required("Deadline Date required"),
  images: string().required("Image required")
})