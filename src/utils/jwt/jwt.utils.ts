import jwt from "jsonwebtoken";
import { StringValue } from "ms";

import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET as string;

export function signJWT(payload: object, expiredTime: StringValue | number): string {
   return jwt.sign(payload, secret, {
      expiresIn: expiredTime,
   });
}

export function verifyJWT<T>(token: string) {
   return jwt.verify(token, secret) as T;
}
