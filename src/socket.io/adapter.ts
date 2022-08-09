import { Server } from "socket.io";
import config from "config";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { logger } from "../utils/logger.util";

const initAdapter = async (io: Server) => {
    
    const redisUrl = config.get<string>("socket.redisUrl");
    
    const pubClient = createClient({ url: redisUrl });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        logger.info("Socket adapter connected to redis.");
    })
    .catch((error) => logger.error(`Error connecting ${error}`));
}

export default initAdapter;