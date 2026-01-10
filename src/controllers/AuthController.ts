import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.services";

export const helloWorld = (req: Request, res: Response, next: NextFunction) => {
   res.json({ "message": "Hello, World!" }).send();
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payload = req.body;
      const result = await AuthService.register(payload);

      return res.status(200).json({ status: 0, message: "Registrasi berhasil silahkan login", result });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" }).send();
   }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payload = req.body;
      const result = await AuthService.login(payload);
      if (!result.status) {
         return res.status(result.err!.code).json({ status: -1, message: result.err!.message }).send();
      }
      return res.status(200).json({ status: 0, message: "Login successful", result: result.data }).send();
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" }).send();
   }
};
