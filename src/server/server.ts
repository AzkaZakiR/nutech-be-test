import path from "path";
import express, { json, urlencoded, Request, Response, NextFunction } from "express";
import router from "../routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
   console.log(`[INFO] Incoming request: ${req.method} ${req.url}`);
   console.log(`[INFO] Request headers: ${JSON.stringify(req.headers)}`);
   console.log(`[INFO] Request body: ${JSON.stringify(req.body)}`);
   next();
});

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
