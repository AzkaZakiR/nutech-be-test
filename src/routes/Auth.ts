import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";

const authRoutes = Router();
authRoutes.get("/hello", AuthController.helloWorld);
authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
export default authRoutes;
