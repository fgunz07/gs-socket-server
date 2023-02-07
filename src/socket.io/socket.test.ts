import http from 'http';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { io, Socket } from 'socket.io-client';
import Redis from 'ioredis';

import app from '../app';
import initSocket from './index';

describe('root namespace', () => {
  let c: Socket, r: Redis, s: http.Server, port: number, auth_token: string;
  const channel = 'laravel.event.7a7d0d7c-bb7b-40d7-ad65-f7b10927c25a';
  const p = { room: channel, payload: null };

  beforeAll((done) => {
    try {
      port = (process.env.PORT || 3000) as number;
      auth_token = (process.env.AUTH_TOKEN || '123') as string;

      s = http.createServer(app);
      s.listen(port, async () => {
        const { redis } = await initSocket(s);
        r = redis.duplicate();
        c = io(`http://localhost:${port}/root`, {
          auth: {
            token: auth_token,
          },
          transports: ['websocket', 'polling'],
        });
        done();
      });
    } catch (error: any) {
      done(error);
    }
  });

  afterAll(() => {
    r.quit();
    c.close();
  });

  describe('event inside namespace', () => {
    it('should trigger event', (done) => {
      try {
        c.on('root', (msg) => {
          expect(msg).toBeNull();
          done();
        });
        c.emit('trigger', { event: 'root', payload: p.payload });
      } catch (error: any) {
        done(error);
      }
    });

    it('should join room', (done) => {
      try {
        c.on('join:room', (msg) => {
          expect(msg).toBeNull();
          done();
        });

        c.emit('join:room', p);
      } catch (error: any) {
        done(error);
      }
    });

    it('should message from the same room', (done) => {
      try {
        c.on('root', (msg) => {
          expect(msg).toBeNull();
          done();
        });

        c.emit('trigger', { event: 'root', ...p });
      } catch (error: any) {
        done(error);
      }
    });

    it('should leave room', (done) => {
      try {
        c.on('leave:room', (msg) => {
          expect(msg).toBe(p.payload);
          done();
        });
        c.emit('leave:room', p);
      } catch (error: any) {
        done(error);
      }
    });

    it('should receive redis messages', (done) => {
      try {
        const cp = JSON.stringify({ id: 1, room: 'sample123' });

        c.on('sample', (msg) => {
          expect(JSON.stringify(msg.payload.message)).toBe(cp);
          done();
        });

        r.publish(channel, cp);
      } catch (error: any) {
        done(error);
      }
    });
  });
});
