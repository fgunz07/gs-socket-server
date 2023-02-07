import http from 'http';

import app from '../app';
import initSocket from '../socket.io';

const _PORT = (process.env.NODE_PORT || 3000) as number;

async function init() {
  const server = http.createServer(app);
  const { socketServer } = await initSocket(server);
  socketServer.listen(_PORT);
  console.log(`[::]:${_PORT}`);
}

init();
