import { Request, Response } from "express";
import getResponse from "../utils/handleResponse/getResponse";
import * as ServiceService from "../services/services.service";

export const getServices = async (req: Request, res: Response) => {
   try {
      const services = await ServiceService.getAllServices();
      return getResponse(res, 200, 0, "Sukses", services);
   } catch (error) {
      return getResponse(res, 500, 999, "Internal server error", null);
   }
};
