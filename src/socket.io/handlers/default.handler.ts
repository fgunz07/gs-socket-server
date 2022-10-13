import { Console } from "console";
import { functions } from "lodash";
import { Server, Socket } from "socket.io";
import { deleteSocket } from "../../services/socket.service";
import { logAccess, logger } from "../../utils/logger.util";

type DataParam = {
    room: string;
    payload: any;
}

const defaultHandler = (io: Server) => (socket: Socket) => {
    logger.info(`Connected SocketID: ${socket.id}`);
    socket.on("join:room", join);
    socket.on("leave:room", leave);
    socket.on("message:room", broadcast);
    socket.on("update:location", updateLocation);
    socket.on("disconnect", disconnect);
    socket.on("custom:event", customEvent);

    function updateLocation(data: DataParam) {
        socket.broadcast.to(data.room).emit("update:location", data.payload);
        logAccess.info(`SockerId: ${socket.id} broadcast a message to room ${data.room}.`);
    }

    function broadcast(data: DataParam) {
        socket.broadcast.to(data.room).emit("message:room", data.payload);
        logAccess.info(`SockerId: ${socket.id} broadcast a message to room ${data.room}.`);
    }

    function join(data: DataParam) {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit("join:room", data.payload);
        logAccess.info(`${socket.id} joined/created the room ${data.room}.`);
    }
    
    function leave(data: DataParam) {
        socket.leave(data.room);
        socket.broadcast.to(data.room).emit("leave:room", data.payload);
        logAccess.info(`${socket.id} left the room ${data.room}.`);
    }

    async function disconnect(error: string) {
        await deleteSocket(socket.id);
        logAccess.warn(`Disconnected SocketID: ${socket.id}; cause ${error}`);
    }

    function customEvent(payload: { event_name: string, room?: string, data?: any  }) {
        if(!payload.room) {
            socket.broadcast.emit(payload.event_name, payload.data);
        } else {
            socket.broadcast.to(payload.room).emit(payload.event_name, payload.data);
        }
        logAccess.info(`${socket.id} triggered custom event.`);
    }
}

export default defaultHandler;