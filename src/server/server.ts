import path from "path";
import express, { json, urlencoded } from "express";
import router from "../routes";
// import cors from "cors";

const app = express();
app.use((req, res, next) => {
   console.log(`[INFO] Incoming request: ${req.method} ${req.url}`);
   console.log(`[INFO] Request headers: ${JSON.stringify(req.headers)}`);
   console.log(`[INFO] Request body: ${JSON.stringify(req.body)}`);
   next();
});
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(router);

export default app;
