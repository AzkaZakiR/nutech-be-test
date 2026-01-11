import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import getResponse from "../utils/handleResponse/getResponse";
import { AppError } from "../utils/errorHandle/appError";
import { uploadProfileImage } from "../utils/multer/uploadProfilePhoto";

export const helloUser = (req: Request, res: Response, next: NextFunction) => {
   const userId = req.user?.id!;
   console.log("masuk get profile", req.user);
   console.log("userId", userId);

   res.json({ "message": "Hello, User this is token routes!" }).send();
};
export const getProfile = async (req: Request, res: Response) => {
   try {
      const userId = req.user?.id!;
      console.log("masuk get profile", req.user);
      console.log("userId", userId);

      const result = await userService.getUserById(userId);
      return getResponse(res, 200, 0, "User profile retrieved successfully", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      console.log("ni error", error);
      return getResponse(res, 500, 999, "Internal server error", null);
   }
};

export const updateProfile = async (req: Request, res: Response) => {
   try {
      const userId = req.user?.id!;
      const payload = req.body;
      const result = await userService.updateProfile(userId, payload);
      return getResponse(res, 200, 0, "Update Pofile berhasil", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      return getResponse(res, 500, 500, "Internal server error", null);
   }
};

export const updateProfilePhoto = async (req: Request, res: Response) => {
   try {
      const userId = req.user?.id!;

      if (!req.file) {
         throw new AppError(400, 201, "Foto profil wajib diunggah");
      }

      const photoUrl = await uploadProfileImage(req.file);

      const result = await userService.updateProfilePhoto(userId, photoUrl);
      return getResponse(res, 200, 0, "Update Profile Photo berhasil", result);
   } catch (error) {
      if (error instanceof AppError) {
         return getResponse(res, error.httpCode, error.status, error.message, null);
      }
      return getResponse(res, 500, 500, "Internal server error", null);
   }
};
