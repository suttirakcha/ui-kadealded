import { date, number, object, string } from "yup";

export const dealSchema = object({
  title: string().min(5,"Title must have at least 5 characters").required("Title is required"),
  category_id: string().required("Please select category"),
  deal_status:string().required("Please select status"),
  seller_id:string().required("Please select seller"),
  max_participants: number().required("Please set the maximum participants"),
  description:string().optional(),
  start_at: date().required("Start Date required"),
  deadline: date().required("Deadline Date required"),
  // images: string().optional()
})