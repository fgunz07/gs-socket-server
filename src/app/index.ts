import express, { Express, Request, Response, NextFunction } from "express";

const app: Express = express();

app.set("x-powered-by", false);
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/healthcheck", (_: Request, res: Response) => {
  res.sendStatus(200);
});

export default app;
