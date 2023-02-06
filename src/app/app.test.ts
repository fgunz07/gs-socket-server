import { describe, it, expect } from '@jest/globals';
import request from 'supertest';

import app from '.';

describe('app', () => {
  describe('response headers', () => {
    it('should not have expowered by', async () => {
      const res = await request(app).get('/');
      expect(res.header).not.toHaveProperty('x-powered-by');
    });
    it('should have access-control-allow-origin', async () => {
      const res = await request(app).get('/');
      expect(res.header).toHaveProperty('access-control-allow-origin');
    });
    it('should have access-control-allow-methods', async () => {
      const res = await request(app).get('/');
      expect(res.header).toHaveProperty('access-control-allow-methods');
    });
    it('should have access-control-allow-headers', async () => {
      const res = await request(app).get('/');
      expect(res.header).toHaveProperty('access-control-allow-headers');
    });
  });
  describe('/healthcheck', () => {
    it('shoulld return 200', async () => {
      const res = await request(app).get('/healthcheck');
      expect(res.status).toBe(200);
    });
  });
});
