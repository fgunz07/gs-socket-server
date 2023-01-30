import * as http from "http";
import { Server, Socket } from "socket.io";

function initSocket(server: http.Server): Server {
  const socketServer = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  socketServer
    // .of((_, __, next) => {
    //   next(null, true);
    // })
    .on("connection", (socket: Socket) => {
      socket.on("trigger", (msg: { event: string; data: any }) => {
        console.log("triggered");
        socket.emit(msg.event, msg.data);
      });
    });

  return socketServer;
}

export default initSocket;
