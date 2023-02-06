import http from 'http';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { io, Socket } from 'socket.io-client';
import Redis from 'ioredis';

import app from '../app';
import initSocket from './index';

describe('root namespace', () => {
  let c: Socket,
    r: Redis,
    s: http.Server,
    port: number,
    redis_host: string,
    redis_port: number,
    redis_user: string,
    redis_pass: string;
  const channel = 'laravel.event.7a7d0d7c-bb7b-40d7-ad65-f7b10927c25a';
  const p = { room: channel, data: null };

  beforeAll((done) => {
    try {
      port = (process.env.PORT || 3000) as number;
      redis_host = (process.env.REDIS_HOST || '127.0.0.1') as string;
      redis_port = (process.env.REDIS_PORT || 6379) as number;
      redis_user = (process.env.REDIS_USER || '') as string;
      redis_pass = (process.env.REDIS_PASS || '') as string;

      s = http.createServer(app);
      initSocket(s);
      s.listen(port, () => {
        c = io(`http://localhost:${port}/root`, {
          auth: {
            token: '123',
          },
          transports: ['websocket', 'polling'],
        });

        r = new Redis({
          port: redis_port,
          host: redis_host,
          username: redis_user,
          password: redis_pass,
          // db: ""
        });

        done();
      });
    } catch (error: any) {
      done(error);
    }
  });

  afterAll((done) => {
    s.close();
    r.quit();
    c.close();
    done();
  });

  describe('event inside namespace', () => {
    it('should trigger event', (done) => {
      try {
        c.on('root', (msg) => {
          expect(msg).toBeNull();
          done();
        });
        c.emit('trigger', { event: 'root', data: p.data });
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
          expect(msg).toBe(p.data);
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
          expect(JSON.stringify(msg.data.message)).toBe(cp);
          done();
        });

        r.publish(channel, cp);
      } catch (error: any) {
        done(error);
      }
    });
  });
});
