import { TransactionRepository } from "../repository/transaction.repository";
import { error } from "../utils/errorHandle/error";
import { transactionSchema } from "../utils/validator/transaction";

const transactionRepository = new TransactionRepository();
export async function topUpBalance(userId: string, amount: bigint) {
   const validateAmount = transactionSchema.safeParse({ amount: Number(amount) });
   if (!validateAmount.success) {
      error(400, 102, validateAmount.error?.issues[0]?.message || "Invalid request payload");
   }
   //    if (amount <= 0) {
   //       error(400, 106, "Jumlah top-up harus lebih besar dari 0");}
   const transactionType = "TOPUP";
   const description = "Top up balance";
   const transaction = await transactionRepository.topupBalance(userId, amount, transactionType, description);

   return transaction;
}

// export async function deductBalance(userId: string, amount: bigint) {
//    if (amount <= 0) {
//       error(400, 107, "Jumlah pemotongan harus lebih besar dari 0");
//    }
//    const transactionType = "DEDUCT";
//    const transaction = await transactionRepository.createTransaction(userId, -amount, transactionType);
//    return transaction;
// }
