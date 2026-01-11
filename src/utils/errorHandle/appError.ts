export class AppError extends Error {
   readonly httpCode: number;
   readonly status: number;
   readonly isOperational: boolean;

   constructor(httpCode: number, status: number, message: string) {
      super(message);
      this.httpCode = httpCode;
      this.status = status;
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
   }
}
