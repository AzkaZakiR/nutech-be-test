import { Router } from "express";
import authRoutes from "./Auth";

const routes = Router();

routes.use("/auth", authRoutes);
export default routes;
