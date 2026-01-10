import jwt from "jsonwebtoken";
import { StringValue } from "ms";

interface VerifyJWTResult<T> {
   payload: T | null;
   expired: boolean;
}
const secret = process.env.JWT_SECRET as string;

export function signJWT(payload: object, expiredTime: StringValue | number): string {
   return jwt.sign(payload, secret, {
      expiresIn: expiredTime,
   });
}

export function verifyJWT(token: string): VerifyJWTResult<any> {
   try {
      const decodedToken = jwt.verify(token, secret);
      return {
         payload: decodedToken,
         expired: false,
      };
   } catch (error) {
      return {
         payload: null,
         expired: true,
      };
   }
}
