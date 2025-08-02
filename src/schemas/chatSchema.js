import { object, string } from "yup";

export const chatSchema = object({
  chat: string(),
  id: string()
})