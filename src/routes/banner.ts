import * as bannerController from "../controllers/banner.controller";
import { Router } from "express";

const bannerRoutes = Router();
bannerRoutes.get("", bannerController.getBanners);

export default bannerRoutes;
