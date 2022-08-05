import { Console } from "console";
import { functions } from "lodash";
import { Server, Socket } from "socket.io";
import { deleteSocket } from "../../services/socket.service";
import { logAccess, logger } from "../../utils/logger.util";

type DataParam = {
    room: string;
    payload: any;
}

const defaultHandler = (io: Server) => (socket: Socket, ) => {
    logger.info(`Connected SocketID: ${socket.id}`);
    socket.on("join:room", join);
    socket.on("leave:room", leave);
    socket.on("message:room", broadcast);
    socket.on("disconnect", disconnect);

    function broadcast(data: DataParam) {
        io.to(data.room).emit("message:room", data.payload);
        logAccess.info(`SockerId: ${socket.id} broadcast a message to room ${data.room}.`);
    }

    function join(data: DataParam) {
        socket.join(data.room);
        socket.to(data.room).emit("join:room", data.payload);
        logAccess.info(`${socket.id} joined/created the room ${data.room}.`);
    }
    
    function leave(data: DataParam) {
        socket.leave(data.room);
        socket.to(data.room).emit("leave:room", data.payload);
        logAccess.info(`${socket.id} left the room ${data.room}.`);
    }

    async function disconnect(error: string) {
        await deleteSocket(socket.id);
        logAccess.warn(`Disconnected SocketID: ${socket.id}; cause ${error}`);
    }
}

export default defaultHandler;