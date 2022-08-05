import { Socket } from "socket.io";
import { deleteSocket } from "../../services/socket.service";
import { logAccess, logger } from "../../utils/logger.util";

type DataParam = {
    room: string;
    payload: any;
    [key: string]: any;
}

const chattHandler = function(socket: Socket) {
    logger.info(`Connected SocketID: ${socket.id}`);

    socket.join(`${socket.id}`); // Default room for this connection

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

    function chatEnter(data: DataParam) {
        socket.to(data.room).emit("chat:enter", data.payload);
    }

    function chatActive(data: DataParam) {
        socket.to(data.room).emit("chat:active", data.payload);
    }
    
    function chatTyping(data: DataParam) {
        socket.to(data.room).emit("chat:typing", data.payload);
    }

    function chatMessage(data: DataParam) {
        socket.to(data.room).emit("chat:message", data.payload);
    }

    function chatGroupEnter(data: DataParam) {
        socket.to(data.room).emit("chat:group:enter", data.payload);
    }

    function chatGroupActive(data: DataParam) {
        socket.to(data.room).emit("chat:group:active", data.payload);
    }

    function chatGroupTyping(data: DataParam) {
        socket.to(data.room).emit("chat:group:typing", data.payload);
    }

    function chatGroupMessage(data: DataParam) {
        socket.to(data.room).emit("chat:group:message", data.payload);
    }

    function broadcast(data: DataParam) {
        socket.to(data.room).emit("message", data.payload);
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
}

export default chattHandler;