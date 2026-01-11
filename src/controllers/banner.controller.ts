import { Request, Response } from "express";
import getResponse from "../utils/handleResponse/getResponse";
import { error } from "../utils/errorHandle/error";
import * as BannerService from "../services/banner.service";
export const getBanners = async (req: Request, res: Response) => {
   try {
      const banners = await BannerService.getAllBanners();
      return getResponse(res, 200, 0, "Sukses", banners);
   } catch (error) {
      return getResponse(res, 500, 999, "Internal server error", null);
   }
};
