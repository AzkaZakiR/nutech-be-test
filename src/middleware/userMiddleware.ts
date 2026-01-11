import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt/jwt.utils";
import getResponse from "../utils/handleResponse/getResponse";

export function userMiddleware(req: Request, res: Response, next: NextFunction) {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return getResponse(res, 401, 103, "Unauthorized", null);
   }

   const [type, token] = authHeader.split(" ");

   if (type !== "Bearer" || !token) {
      return getResponse(res, 401, 103, "Token tidak ada", null);
   }

   try {
      const user = verifyJWT(token);
      req.user = user.payload;
      next();
   } catch (err) {
      return getResponse(res, 401, 103, "Token tidak valid atau kaladuarsa", null);
   }
}
