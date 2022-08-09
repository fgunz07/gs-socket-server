import { logger } from "./utils/logger.util";
import config from "config";
import express from "express";
import http from "http";
import socket from "./socket.io";
import routes from "./routes";
import dbConnect from "./utils/db-connect.util";

const _HOST = config.get<string>("host");
const _PORT = config.get<number>("port");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

const bootstrap = () => {
    server.listen(_PORT, _HOST, async () => {
        await dbConnect();
    
        socket(server);
        routes(app);
        
        logger.info(`Server with environment ${process.env.NODE_ENV} and running on http://${_HOST}:${_PORT}`);
    });
}

export default bootstrap;
