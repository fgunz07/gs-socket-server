import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';

const REDIS_HOST = (process.env.REDIS_HOST || 'localhost:6379') as string;
const AUTH_TOKEN = (process.env.AUTH_TOKEN || '123.456') as string;

async function initSocket(server: http.Server): Promise<Server> {
  const redisPub = createClient({ url: `redis://${REDIS_HOST}` });
  const redisSub = redisPub.duplicate();

  await redisPub.connect();
  await redisSub.connect();

  const socketServer = new Server(server, {
    cors: {
      origin: '*',
    },
  }).adapter(createAdapter(redisPub, redisSub));

  socketServer
    .of((_, __, next) => {
      next(null, true);
    })
    .use((socket: Socket, next: Function) => {
      const tokens = AUTH_TOKEN.split('.');
      if (
        socket.handshake.query.socket_key !== tokens[0] &&
        socket.handshake.query.socket_secret !== tokens[1]
      ) {
        console.log(`Invalid token ${socket.id}.`);
        next(new Error('Invalid token.'));
        return;
      }
      next();
    })
    .on('connection', async (socket: Socket): Promise<void> => {
      console.log(`New connection ${socket.id}`);
      socket.on(
        'trigger',
        (msg: { event: string; room?: string; payload: any }): any => {
          if (msg.room) {
            console.log(
              `New event triggered from ${socket.id} to room ${msg.room}, event ${msg.event}`
            );
            socket.broadcast.to(msg.room).emit(msg.event, msg.payload);
            return;
          }
          console.log(
            `New event triggered from ${socket.id}, event ${msg.event}`
          );
          socket.broadcast.emit(msg.event, msg.payload);
        }
      );

      socket.on(
        'join:room',
        (msg: { room: string; payload: string | object }): void => {
          console.log(`New socket ${socket.id} joined the room ${msg.room}.`);
          socket.join(msg.room);
          socket.broadcast.emit('join:room', msg.payload);
        }
      );

      socket.on(
        'leave:room',
        (msg: { room: string; payload: string | object }): void => {
          console.log(`New socket ${socket.id} left the room ${msg.room}.`);
          socket.leave(msg.room);
          socket.broadcast.emit('leave:room', msg.payload);
        }
      );
    })
    .on('disconnect', (socket: Socket) => {
      console.log(`New socket disconnected ${socket.id}`);
    });

  redisSub.PSUBSCRIBE('laravel.event.*', function (message, channel) {
    console.info(`channel: ${channel}\nreceived: ${message}`);
    console.log(
      `Redis published 'message' '${message}' to channel '${channel}'`
    );
    const jsonMessage = JSON.parse(message);
    console.log(jsonMessage);
    if (jsonMessage.room) {
      console.log(
        `Triggered redis event to room ${jsonMessage.room} with action ${jsonMessage.event}`
      );
      socketServer
        .to(jsonMessage.room)
        .emit(jsonMessage.event, jsonMessage.payload);
      return;
    }
    console.log(`Triggered redis event with action ${jsonMessage.event}`);
    socketServer.emit(jsonMessage.event, jsonMessage.payload);
  });

  return socketServer;
}

export default initSocket;
