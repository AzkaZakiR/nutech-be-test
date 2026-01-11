import { Router } from "express";
import authRoutes from "./Auth";
import userRoutes from "./user";
import bannerRoutes from "./banner";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/profile", userRoutes);
routes.use("/banner", bannerRoutes);
export default routes;
