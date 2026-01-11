import { Router } from "express";
import authRoutes from "./Auth";
import userRoutes from "./user";
import bannerRoutes from "./banner";
import serviceRoutes from "./service";
import transactionRoutes from "./transaction";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/profile", userRoutes);
routes.use("/banner", bannerRoutes);
routes.use("/services", serviceRoutes);
routes.use("", transactionRoutes);
export default routes;
