import express, { Express, Request, Response, NextFunction } from "express";

const app: Express = express();
const origins = (process.env.ALLOWED_ORIGIN || []) as string[];

app.set("X-Powered-By", false);

app.use((_: Request, res: Response, next: NextFunction) => {
    console.log(origins);
    origins.forEach(origin => {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    });
    next();
});

app.get("/healthcheck", (_: Request, res: Response) => {
    res.sendStatus(200);
});

export default app;
