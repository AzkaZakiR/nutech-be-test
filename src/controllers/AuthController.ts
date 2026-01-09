import { Request, Response, NextFunction } from "express";

export const helloWorld = (req: Request, res: Response, next: NextFunction) => {
   res.json({ "message": "Hello, World!" }).send();
};
