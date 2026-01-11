export interface UserPayload {
   id: string;
   email: string;
   first_name?: string;
   last_name?: string;
}

declare global {
   namespace Express {
      interface Request {
         user?: UserPayload;
      }
   }
}

export {};
