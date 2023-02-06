import http from 'http';

import app from '../app';
import initSocket from '../socket.io';

const _PORT = (process.env.NODE_PORT || 3000) as number;

const server = http.createServer(app);

initSocket(server);

server.listen(_PORT, () => console.log(`[::]:${_PORT}`));
