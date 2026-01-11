import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import * as transactionController from "../controllers/transaction.controller";
import { getUserBalance } from "../controllers/user.controller";
const transactionRoutes = Router();
transactionRoutes.post("/topup", userMiddleware, transactionController.topUpBalance);
transactionRoutes.post("/transaction", userMiddleware, transactionController.servicesTransaction);
transactionRoutes.get("/transaction/history", userMiddleware, transactionController.historyTransaction);
transactionRoutes.get("/balance", userMiddleware, getUserBalance);

export default transactionRoutes;
