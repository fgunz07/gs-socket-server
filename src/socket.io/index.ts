import * as http from 'http';
import { Server, Socket } from 'socket.io';
import Redis from 'ioredis';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const REDIS_HOST = (process.env.REDIS_HOST || 'localhost') as string;
const REDIS_PORT = (process.env.REDIS_PORT || 6379) as number;
const REDIS_USER = (process.env.REDIS_USER || '') as string;
const REDIS_PASS = (process.env.REDIS_PASS || '') as string;
const AUTH_TOKEN = (process.env.AUTH_TOKEN || '123') as string;

function initSocket(server: http.Server): Server {
  const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    username: REDIS_USER,
    password: REDIS_PASS,
    // db: ""
  });

  // Socket adopter
  const pubClient = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    username: REDIS_USER,
    password: REDIS_PASS,
  });
  const subClient = pubClient.duplicate();

  const socketServer = new Server(server, {
    cors: {
      origin: '*',
    },
  }).adapter(createAdapter(pubClient, subClient));

  redis.on('ready', () => {
    console.log(`Redis connection is ready.`);
  });

  redis.on('error', (error) => {
    console.log(`Error: ${error}`);
  });

  redis.psubscribe('laravel.event.*', (error, _) => {
    if (error) {
      console.error(`Unable to subcribe to channel * ${error.message}`);
    }
  });

  socketServer
    .of((_, __, next) => {
      next(null, true);
    })
    .use((socket: Socket, next: Function) => {
      if (socket.handshake.auth.token !== AUTH_TOKEN) {
        console.log(`Invalid token ${socket.id}.`);
        next(new Error('Invalid token.'));
        return;
      }
      next();
    })
    .on('connection', (socket: Socket): void => {
      console.log(`New connection ${socket.id}`);
      socket.on(
        'trigger',
        (msg: { event: string; room?: string; data: any }): any => {
          if (msg.room) {
            console.log(
              `New event triggered from ${socket.id} to room ${msg.room}, event ${msg.event}`
            );
            socket.nsp.to(msg.room).emit(msg.event, msg.data);
            return;
          }
          console.log(
            `New event triggered from ${socket.id}, event ${msg.event}`
          );
          socket.nsp.emit(msg.event, msg.data);
        }
      );

      socket.on(
        'join:room',
        (msg: { room: string; data: string | object }): void => {
          console.log(`New socket ${socket.id} joined the room ${msg.room}.`);
          socket.join(msg.room);
          socket.nsp.emit('join:room', msg.data);
        }
      );

      socket.on(
        'leave:room',
        (msg: { room: string; data: string | object }): void => {
          console.log(`New socket ${socket.id} left the room ${msg.room}.`);
          socket.leave(msg.room);
          socket.nsp.emit('leave:room', msg.data);
        }
      );

      redis.on('pmessage', (p, c, message) => {
        console.info(`pattern: ${p};\nchannel: ${c}\nreceived: ${message}`);
        console.log(`Redis published message ${message} to channel ${c}`);
        message = JSON.parse(message);
        socket.nsp.emit('sample', {
          room: message.room,
          data: { message },
        });
      });
    })
    .on('disconnect', (socket: Socket) => {
      console.log(`New socket disconnected ${socket.id}`);
    });

  return socketServer;
}

export default initSocket;
