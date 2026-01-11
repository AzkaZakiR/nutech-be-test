import { Response } from "express";

const getResponse = (res: Response, httpCode: number, status: number, message: string, data: any): Response =>
   res.status(httpCode).json({
      status: status,
      message,
      data,
   });

export default getResponse;
