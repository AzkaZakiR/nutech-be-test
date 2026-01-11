import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { r2 } from "../r2/r2";

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;

export async function uploadProfileImage(file: Express.Multer.File) {
   try {
      const ext = file.mimetype === "image/png" ? "png" : "jpeg";

      const key = `profile_photo/${crypto.randomUUID()}.${ext}`;
      await r2.send(
         new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentLength: file.buffer.length,
         })
      );
      return `${PUBLIC_URL}/${key}`;
   } catch (error) {
      console.error("R2 upload error:", error);
      throw error;
   }
}
