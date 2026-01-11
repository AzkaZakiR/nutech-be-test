import { AppError } from "./appError";

export function error(httpCode: number, status: number, message: string): never {
   throw new AppError(httpCode, status, message);
}
