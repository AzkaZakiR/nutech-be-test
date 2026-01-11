import { pool } from "../db/pg";

export class BannerRepository {
   async getAllBanners() {
      const sql = `
        SELECT *
        FROM banner`;
      const { rows } = await pool.query(sql);
      return rows;
   }
}
