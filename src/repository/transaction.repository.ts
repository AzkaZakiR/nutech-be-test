import { pool } from "../db/pg";
import { randomUUID } from "crypto";

export class TransactionRepository {
   async createTransaction(userId: string, amount: bigint, transactionType: string, description: string) {
      const id = randomUUID();
      const invoiceNumber = `INV-${Date.now()}`;
      console.log("Creating transaction:", { id, userId, amount, transactionType, description });
      const sql = `
        INSERT INTO transactions (
            id,
            user_id,
            total_amount,
            transaction_type,
            invoice_number
            description,
            createdon
        ) VALUES (
            $1, $2, $3, $4, $5, $6 NOW()
        )
        RETURNING id, user_id, total_amount, transaction_type, createdon, invoice_number, description,`;
      const values = [id, userId, amount, transactionType, invoiceNumber, description];
      const { rows } = await pool.query(sql, values);
      return rows[0];
   }

   async topupBalance(userId: string, amount: bigint, transactionType: string, description: string) {
      const client = await pool.connect();
      const invoiceNumber = `INV-${Date.now()}`;
      const updateBalanceSql = `
        UPDATE users
        SET balance = balance + $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING id, balance
        `;
      const insertTransactionSql = `
        INSERT INTO transactions (
            id,
            user_id,
            total_amount,
            transaction_type,
            invoice_number,
            description,
            createdon,
            transaction_date
        ) VALUES (
            $1, $2, $3, $4, $5, $6, NOW(), NOW()
        )
        RETURNING id, user_id, total_amount, transaction_type, createdon, invoice_number, description, transaction_date`;
      try {
         await client.query("BEGIN");

         await client.query(insertTransactionSql, [randomUUID(), userId, amount, transactionType, invoiceNumber, description]);

         const { rows } = await client.query(updateBalanceSql, [amount, userId]);

         await client.query("COMMIT");
         return rows[0];
      } catch (e) {
         await client.query("ROLLBACK");
         throw e;
      } finally {
         client.release();
      }
   }
}
