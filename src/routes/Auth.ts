import { Router } from "express";
import * as AuthController from "../controllers/AuthController";

const authRoutes = Router();
authRoutes.get("/hello", AuthController.helloWorld);
authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
export default authRoutes;
