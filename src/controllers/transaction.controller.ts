import { Request, Response, NextFunction } from "express";
import getResponse from "../utils/handleResponse/getResponse";
import * as transactionService from "../services/transaction.service";
import { AppError } from "../utils/errorHandle/appError";

export const topUpBalance = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.user?.id!;
      const { amount } = req.body;

      const result = await transactionService.topUpBalance(userId, amount);
      return getResponse(res, 200, 0, "Top up amount", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      return getResponse(res, 500, 500, "Internal server error", null);
   }
};
