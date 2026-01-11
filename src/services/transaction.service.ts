import { json } from "zod";
import { TransactionRepository } from "../repository/transaction.repository";
import { UserRepository } from "../repository/user.repository";
import { error } from "../utils/errorHandle/error";
import { transactionSchema } from "../utils/validator/transaction";

const transactionRepository = new TransactionRepository();
const userRepository = new UserRepository();
export async function topUpBalance(userId: string, amount: bigint) {
   const validateAmount = transactionSchema.safeParse({ amount: Number(amount) });
   if (!validateAmount.success) {
      error(400, 102, validateAmount.error?.issues[0]?.message || "Invalid request payload");
   }

   const transactionType = "TOPUP";
   const description = "Top up balance";
   const transaction = await transactionRepository.topupBalance(userId, amount, transactionType, description);

   return transaction;
}

export async function servicesTransaction(userId: string, serviceCode: string) {
   const serviceName = await transactionRepository.findServiceTransaction(userId, serviceCode);

   if (!serviceName) {
      throw error(404, 102, "Service atau layanan tidak ditemukan");
   }

   const transactionType = "TOPUP";
   const checkBalance = await userRepository.getUserBalance(userId);
   if (checkBalance.balance < BigInt(serviceName.service_tariff)) {
      throw error(400, 108, "Saldo tidak cukup untuk melakukan transaksi");
   }

   const transaction = await transactionRepository.createTransaction(userId, BigInt(-serviceName.service_tariff), serviceName.id, transactionType, `Pembelian layanan ${serviceName.service_name}`);

   return {
      invoice_number: transaction.invoice_number,
      service_code: serviceName.service_code,
      service_name: serviceName.service_name,
      transaction_type: transaction.transaction_type,
      total_amount: Number(transaction.total_amount),
      created_on: transaction.transaction_date,
   };
}

export async function historyTransaction(userId: string, offset?: number, limit?: number) {
   const user = await userRepository.findById(userId);
   if (!user) {
      error(404, 104, "User tidak ditemukan");
   }

   const userHistory = await transactionRepository.historyTransaction(userId, offset, limit);

   return userHistory;
}
