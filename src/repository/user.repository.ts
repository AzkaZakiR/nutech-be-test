import { pool } from "../db/pg";

export class UserRepository {
   async findById(id: string) {
      const sql = `
        SELECT *
        FROM users 
        WHERE id = $1`;
      const { rows } = await pool.query(sql, [id]);
      return rows[0] || null;
   }

   async updateBalance(userId: string, newBalance: bigint) {
      const sql = `
        UPDATE users
        SET balance = $1,
        updated_at = NOW()
        WHERE id = $2
        RETURNING balance`;
      const { rows } = await pool.query(sql, [newBalance, userId]);
      return rows[0];
   }

   async updateUser(userId: string, payload: any) {
      const sql = `
            UPDATE users
            SET first_name = $1,
            last_name = $2,
            updated_at = NOW()
            WHERE id = $3
            RETURNING *`;
      const values = [payload.first_name, payload.last_name, userId];
      const { rows } = await pool.query(sql, values);
      return rows[0];
   }

   async updateUserPhoto(userId: string, photoUrl: string) {
      const sql = `
        UPDATE users
        SET profile_image = $1,
        updated_at = NOW()
        WHERE id = $2
        RETURNING *`;
      const values = [photoUrl, userId];
      const { rows } = await pool.query(sql, values);
      return rows[0];
   }

   async getUserBalance(userId: string) {
      const sql = `
        SELECT balance
        FROM users
        WHERE id = $1`;
      const { rows } = await pool.query(sql, [userId]);
      return rows[0];
   }
}
