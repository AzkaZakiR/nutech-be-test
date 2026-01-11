import { z } from "zod";

export const registerSchema = z.object({
   email: z.email({ message: "Parameter email tidak sesuai format" }),
   password: z.string().min(8, { message: "Panjang Password minimal 8 karakter" }),
   first_name: z.string().min(1, { message: "First name is required" }),
   last_name: z.string().min(1, { message: "Last name is required" }),
});

export const loginSchema = z.object({
   email: z.email({ message: "Parameter email tidak sesuai format" }),
   password: z.string().min(8, { message: "Panjang Password minimal 8 karakter" }),
});
