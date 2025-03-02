import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" })
    .min(5, { message: "Must be 5 or more characters long" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Please enter the password atleast 8 char" }),
});