import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { logger } from "../utils/logger.util";
import { createSocket } from "../services/socket.service";
import chatHandler from "./handlers/chat.handler";
import config from "config";
import defaultHandler from "./handlers/default.handler";
import orderHandler from "./handlers/order.handler";

const _HOST = config.get<string>("host");
const _PORT = config.get<number>("port");
const socketKey = config.get<string>("jwtOptions.authorized.socket_key");
const socketSecret = config.get<string>("jwtOptions.authorized.socket_secret");

function socket(http: HttpServer) {
    const io = new Server(http, {
        cors: {
            origin: "*",
            credentials: true
        }
    });

    io.of("/").use(globalMiddleware).on("connection", defaultHandler(io));
    io.of("/chat").use(globalMiddleware).on("connection", chatHandler);
    io.of("/orders").use(globalMiddleware).on("connection", orderHandler);

    logger.info(`Socket server with environment ${process.env.NODE_END} and running on http://${_HOST}:${_PORT}/socket.io/`);
}

async function globalMiddleware(socket: Socket, next: Function) {
    const socket_key = socket.handshake.query.socket_key as string|"";
    const socket_secret = socket.handshake.query.socket_secret as string|"";

    const isValid = await validateQuery(socket_key, socket_secret);

    if(!isValid) {
        logger.error(`Invalid access keys ${socket.id}.`);
        next(new Error("Invalid access keys."));
    }

    await createSocket({ socket_id: socket.id, namespace: socket.nsp.name });

    next();
}

async function validateQuery(req_socket_key: string, req_socket_secret: string): Promise<Boolean> {
    return (socketKey === req_socket_key && socketSecret === req_socket_secret);
}

export default socket;