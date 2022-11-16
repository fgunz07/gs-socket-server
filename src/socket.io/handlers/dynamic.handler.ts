// import { Console } from "console";
// import { functions } from "lodash";
import { Server, Socket } from "socket.io";
// import { deleteSocket } from "../../services/socket.service";
import { logAccess, logger } from "../../utils/logger.util";

const dynamicHandler = (io: Server) => (socket: Socket) => {
    logger.info(`Connected SocketID: ${socket.id}`);

    socket.on("trigger", trigger);
    socket.on("join:room", join);
    socket.on("leave:room", leave);

    function trigger(data: { room: string, event: string, payload: any }) {
        if(!data.room) {
            return socket.broadcast.emit(data.event, data.payload);
        }
        socket.broadcast.to(data.room).emit(data.event, data.payload);
    }

    function join(data: { room: string, payload: any }) {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit("join:room", data.payload);
        logAccess.info(`${socket.id} joined/created the room ${data.room}.`);
    }
    
    function leave(data: { room: string, payload: any }) {
        socket.leave(data.room);
        socket.broadcast.to(data.room).emit("leave:room", data.payload);
        logAccess.info(`${socket.id} left the room ${data.room}.`);
    }
}

export default dynamicHandler;
