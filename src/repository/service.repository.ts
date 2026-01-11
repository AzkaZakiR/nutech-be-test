import { pool } from "../db/pg";

export class ServiceRepository {
   async getAllServices() {
      const sql = `
        SELECT *
        FROM services`;
      const { rows } = await pool.query(sql);
      return rows;
   }
}
