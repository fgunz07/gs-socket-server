import { Server, Socket } from "socket.io";
import { deleteSocket } from "../../services/socket.service";
import { logAccess, logger } from "../../utils/logger.util";

type DataParam = {
    room: string;
    payload: any;
    [key: string]: any;
}

const chattHandler = (io: Server) => (socket: Socket) => {
    logger.info(`Connected SocketID: ${socket.id}`);

    socket.on("chat:enter", chatEnter);
    socket.on("chat:active", chatActive);
    socket.on("chat:typing", chatTyping);
    socket.on("chat:message", chatMessage);

    socket.on("chat:group:enter", chatGroupEnter);
    socket.on("chat:group:active", chatGroupActive);
    socket.on("chat:group:typing", chatGroupTyping);
    socket.on("chat:group:message", chatGroupMessage);

    socket.on("join:room", join);
    socket.on("leave:room", leave);
    socket.on("broadcast", broadcast);
    socket.on("disconnect", disconnect);

    socket.on("custom:event", customEvent);

    function chatEnter(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:enter", data.payload);
    }

    function chatActive(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:active", data.payload);
    }
    
    function chatTyping(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:typing", data.payload);
    }

    function chatMessage(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:message", data.payload);
    }

    function chatGroupEnter(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:group:enter", data.payload);
    }

    function chatGroupActive(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:group:active", data.payload);
    }

    function chatGroupTyping(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:group:typing", data.payload);
    }

    function chatGroupMessage(data: DataParam) {
        socket.broadcast.to(data.room).emit("chat:group:message", data.payload);
    }

    function broadcast(data: DataParam) {
        socket.broadcast.to(data.room).emit("message", data.payload);
        logAccess.info(`SockerId: ${socket.id} broadcast a message to room ${data.room}.`);
    }

    function join(data: DataParam) {
        socket.join(data.room);
        logAccess.info(`${data.room} joined the room.`);
    }
    
    function leave(data: DataParam) {
        socket.leave(data.room);
        logAccess.info(`${data.room} left the room.`);
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

export default chattHandler;