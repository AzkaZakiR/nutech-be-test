import { pool } from "../db/pg";
import { randomUUID } from "crypto";

export class TransactionRepository {
   async topupBalance(userId: string, amount: bigint, transactionType: string, description: string) {
      const client = await pool.connect();
      const invoiceNumber = `INV-${Date.now()}`;

      const updateBalanceSql = `
        UPDATE users
        SET balance = balance + $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING id, balance `;

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
        ) VALUES (   $1, $2, $3, $4, $5, $6, NOW(), NOW()
         )RETURNING id, user_id, total_amount, transaction_type, createdon, invoice_number, description, transaction_date`;

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

   async findServiceTransaction(userId: string, serviceCode: string) {
      const sql = `
      SELECT * FROM services WHERE service_code = $1;`;
      const { rows } = await pool.query(sql, [serviceCode]);
      return rows[0] || null;
   }

   async createTransaction(userId: string, amount: bigint, serviceId: number, transactionType: string, description: string) {
      const client = await pool.connect();
      const invoiceNumber = `INV-${Date.now()}`;

      const insertTransactionSql = `
        INSERT INTO transactions (
        id,
        user_id,
        service_id,
        total_amount,
        transaction_type,
        invoice_number,
        description,
        createdon,
        transaction_date
        ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
        )
        RETURNING
        id,
        user_id,
        service_id,
        total_amount,
        transaction_type,
        invoice_number,
        description,
        transaction_date `;

      const updateBalanceSql = `
        UPDATE users
        SET balance = balance + $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING balance`;

      try {
         await client.query("BEGIN");

         const balanceResult = await client.query(`SELECT balance FROM users WHERE id = $1 FOR UPDATE`, [userId]);
         if (balanceResult.rowCount === 0) throw new Error("User tidak ditemukan");

         const balanceChange = transactionType === "TOPUP" ? amount : -amount;
         const totalAmountToStore = amount < 0 ? -amount : amount;

         const { rows: transactionRows } = await client.query(insertTransactionSql, [randomUUID(), userId, serviceId, totalAmountToStore, transactionType, invoiceNumber, description]);

         await client.query(updateBalanceSql, [balanceChange, userId]);
         await client.query("COMMIT");
         return transactionRows[0];
      } catch (error) {
         await client.query("ROLLBACK");
         throw error;
      } finally {
         client.release();
      }
   }
}
