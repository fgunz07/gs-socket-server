import { Omit } from "lodash";
import { Server, Socket } from "socket.io";
import { deleteSocket } from "../../services/socket.service";
import { logAccess, logger } from "../../utils/logger.util";

type DataParam = {
    room: string;
    payload: any;
    [key: string]: any;
}

const orderHandler = (io: Server) => (socket: Socket) => {
    logger.info(`Connected SocketID: ${socket.id}`);

    socket.on("broadcast", broadcast);
    socket.on("disconnect", disconnect);
    socket.on("join:room", join);
    socket.on("leave:room", leave);
    socket.on("order:add:cart", orderAddCart);
    socket.on("order:created", orderCreated);
    socket.on("order:completed", orderCompleted);
    socket.on("order:pickedup", orderPickedUp);
    socket.on("order:ontheway", orderOnTheWay);

    socket.on("custom:event", customEvent);

    function orderAddCart(data: DataParam) {
        if(!data.room) {
            return socket.broadcast.emit("order:add:cart", data.payload);
        }
        return socket.broadcast.to(data.room).emit("order:add:cart", data.payload);
    }

    function orderCreated(data: DataParam) {
        if(!data.room) {
            return socket.broadcast.emit("order:created", data.payload);
        }
        return socket.broadcast.to(data.room).emit("order:created", data.payload);
    }

    function orderCompleted(data: DataParam) {
        if(!data.room) {
            return socket.broadcast.emit("order:completed", data.payload);
        }
        return socket.broadcast.to(data.room).emit("order:completed", data.payload);
    }

    function orderPickedUp(data: DataParam) {
        if(!data.room) {
            return socket.broadcast.emit("order:pickedup", data.payload);
        }
        return socket.broadcast.to(data.room).emit("order:pickedup", data.payload);
    }

    function orderOnTheWay(data: DataParam) {
        if(!data.room) {
            return socket.broadcast.emit("order:ontheway", data.payload);
        }
        return socket.broadcast.to(data.room).emit("order:ontheway", data.payload);
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

export default orderHandler;