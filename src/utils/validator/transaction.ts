import { z } from "zod";

export const transactionSchema = z.object({
   amount: z.number({ message: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0" }).positive({ message: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0" }),
});
