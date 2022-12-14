import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { logger } from "../utils/logger.util";
// import { createSocket } from "../services/socket.service";
// import chatHandler from "./handlers/chat.handler";
// import defaultHandler from "./handlers/default.handler";
// import orderHandler from "./handlers/order.handler";
import config from "config";
import dynamicHandler from "./handlers/dynamic.handler";
import initAdapter from "./adapter";

const _ORIGINS = config.get<Array<string>>("allowedOrigins");
const _HOST = config.get<string>("host");
const _PORT = config.get<number>("port");
const socketKey = config.get<string>("socket.keys.socket_key");
const socketSecret = config.get<string>("socket.keys.socket_secret");

async function socket(http: HttpServer) {
    try {

        const io = new Server(http, {
            cors: {
                origin: _ORIGINS,
                credentials: true
            }
        });

        await initAdapter(io);

        io.of((name, auth, next) => {
            next(null, true);
        })
        .use(globalMiddleware)
        .on("connection", dynamicHandler(io));
    
        // io.of("/").use(globalMiddleware).on("connection", defaultHandler(io));
        // io.of("/chat").use(globalMiddleware).on("connection", chatHandler(io));
        // io.of("/orders").use(globalMiddleware).on("connection", orderHandler(io));
    
        logger.info(`Socket server with environment ${process.env.NODE_ENV} and running on http://${_HOST}:${_PORT}/socket.io/`);
    } catch(error: any) {
        logger.error(`There was an error while initializing socket server pleace check error message -> ${error}`);
    }
}

async function globalMiddleware(socket: Socket, next: Function) {
    const socket_key = socket.handshake.query.socket_key as string | "";
    const socket_secret = socket.handshake.query.socket_secret as string | "";

    try {

        const isValid = await validateQuery(socket_key, socket_secret);

        if (!isValid) {
            logger.error(`Invalid access keys ${socket.id}.`);
            next(new Error("Invalid access keys."));
        }

        // console.log(socket.handshake.headers["user-agent"]);

        // await createSocket({ socket_id: socket.id, namespace: socket.nsp.name });

        next();

    } catch (error: any) {
        next(new Error(error));
    }
}

async function validateQuery(req_socket_key: string, req_socket_secret: string): Promise<Boolean> {
    return (socketKey === req_socket_key && socketSecret === req_socket_secret);
}

export default socket;