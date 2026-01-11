import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import * as transactionController from "../controllers/transaction.controller";

const transactionRoutes = Router();
transactionRoutes.post("/topup", userMiddleware, transactionController.topUpBalance);
transactionRoutes.post("/transaction", userMiddleware, transactionController.servicesTransaction);
export default transactionRoutes;
