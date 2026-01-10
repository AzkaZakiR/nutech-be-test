import { pool } from "../db/pg";
import { randomUUID } from "crypto";

export class AuthRepository {
   async findByEmail(email: string) {
      const sql = `
      SELECT *
      FROM users
      WHERE email = $1
      LIMIT 1
    `;
      const { rows } = await pool.query(sql, [email]);
      return rows[0] || null;
   }

   async findById(id: string) {
      const sql = `
      SELECT *
      FROM users
      WHERE id = $1
    `;
      const { rows } = await pool.query(sql, [id]);
      return rows[0] || null;
   }

   async create(payload: any, hashedPassword: string) {
      const id = randomUUID();

      const sql = `
      INSERT INTO users (
        id,
        email,
        first_name,
        last_name,
        password,
        balance,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, 0, NOW(), NOW()
      )
      RETURNING id
    `;

      const values = [id, payload.email, payload.firstName, payload.lastName, hashedPassword];

      const { rows } = await pool.query(sql, values);
      return rows[0];
   }

   async updateBalance(userId: string, newBalance: bigint) {
      const sql = `
      UPDATE users
      SET balance = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING balance
    `;
      const { rows } = await pool.query(sql, [newBalance, userId]);
      return rows[0];
   }
}
