import http, { Server } from "http";
import dotenv from "dotenv";

import app from "./app";

dotenv.config();

const server: Server = http.createServer(app);
const _PORT = (process.env.PORT || 8080) as number;

server.listen(_PORT, () => console.log(`Started ${_PORT}`));
