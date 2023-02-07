import * as http from 'http';
import Redis from 'ioredis';
import { Server, Socket } from 'socket.io';
import { MongoClient } from 'mongodb';
import { createAdapter } from '@socket.io/mongo-adapter';

import redisDB from '../databases/redis.db';
import mongoDB, { MONGO_DBNAME, MONGO_COLLECTION } from '../databases/mongo.db';

const AUTH_TOKEN = (process.env.AUTH_TOKEN || '123') as string;

async function initSocket(server: http.Server): Promise<{
  socketServer: Server;
  redis: Redis;
  mongo: MongoClient | undefined;
}> {
  let mongoCollection;
  const mongo = await mongoDB();
  const redis = redisDB();

  try {
    if (mongo) {
      mongoCollection = mongo.db(MONGO_DBNAME).collection(MONGO_COLLECTION);
    }
  } catch (error) {
    console.log(`MongoError: ${error}`);
  }

  const socketServer = new Server(server, {
    cors: {
      origin: '*',
    },
  }).adapter(createAdapter(mongoCollection));

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

  return { socketServer, redis, mongo };
}

export default initSocket;
