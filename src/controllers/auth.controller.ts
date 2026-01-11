import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service";
import getResponse from "../utils/handleResponse/getResponse";
import { AppError } from "../utils/errorHandle/appError";

export const helloWorld = (req: Request, res: Response, next: NextFunction) => {
   res.json({ "message": "Hello, World!" }).send();
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payload = req.body;
      const result = await AuthService.register(payload);

      return getResponse(res, 201, 0, "User registered successfully", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      console.log("ni error", error);
      return getResponse(res, 500, 999, "Internal server error", null);
   }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payload = req.body;
      const result = await AuthService.login(payload);

      return getResponse(res, 200, 0, "Login berhasil", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      console.log("ni error", error);
      return getResponse(res, 500, 999, "Internal server error", null);
   }
};
