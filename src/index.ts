import http, { Server } from "http";

// import app from "./app";
import initSocket from "./socket.io";

const server: Server = http.createServer();
const _PORT = (process.env.NODE_PORT || 8080) as number;

initSocket(server);

server.listen(_PORT, () => console.log(`[::]:${_PORT}`));
