import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { userMiddleware } from "../middleware/userMiddleware";
import { upload } from "../utils/multer/multerConfig";

const userRoutes = Router();
userRoutes.get("", userMiddleware, UserController.getProfile);
userRoutes.get("/hello", userMiddleware, UserController.helloUser);
userRoutes.put("/update", userMiddleware, UserController.updateProfile);
userRoutes.put("/image", userMiddleware, upload.single("file"), UserController.updateProfilePhoto);
export default userRoutes;
