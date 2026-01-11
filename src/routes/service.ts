import * as serviceController from "../controllers/service.controller";
import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";

const serviceRoutes = Router();
serviceRoutes.get("", userMiddleware, serviceController.getServices);

export default serviceRoutes;
