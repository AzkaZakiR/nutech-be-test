import { Router } from "express";
import * as AuthController from "../controllers/AuthController";

const authRoutes = Router();
authRoutes.get("/hello", AuthController.helloWorld);
export default authRoutes;
