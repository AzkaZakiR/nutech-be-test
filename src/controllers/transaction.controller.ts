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

export const servicesTransaction = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.user?.id!;
      const { service_code } = req.body;
      const result = await transactionService.servicesTransaction(userId, service_code);
      return getResponse(res, 200, 0, "Transaksi Berhasil", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      return getResponse(res, 500, 500, "Internal server error", null);
   }
};

export const historyTransaction = async (req: Request, res: Response) => {
   try {
      const userId = req.user?.id!;
      const offset = req.query.offset ? Number(req.query.offset) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 0;

      const result = await transactionService.historyTransaction(userId, offset, limit);

      return getResponse(res, 200, 0, "Get history berhasil", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      return getResponse(res, 500, 500, "Internal server error", null);
   }
};
