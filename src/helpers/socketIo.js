import http from 'http';
import { config } from 'dotenv';
import socketIO from 'socket.io';
import eventEmitter from './notification/eventEmitter';

config();

const SocketIO = (app) => {
  http.createServer(app);
  const port = process.env.SOCKET_PORT;
  const io = socketIO.listen(app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Socket.IO is running on port: ${port}`);
  }));
  io.use((socket, next) => {
    next(null, next);
  });

  io.on('connection', (socket) => {
    eventEmitter.on('new_inapp', (message, user) => {
      socket.emit('new_articles', {
        message,
        user
      });
    });
  });
  return io;
};
export default SocketIO;
