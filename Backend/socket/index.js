const { Server } = require('socket.io');
const wsAuth = require('./auth');
const logger = require('../utils/logger');

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });

  io.use(wsAuth);

  io.on('connection', (socket) => {
    logger.info(`🔌 Socket connected: ${socket.id}`);

    socket.on('join_room', (room) => {
      socket.join(room);
      socket.to(room).emit('user_joined', socket.user.id);
    });

    socket.on('send_message', async ({ room, text }) => {
      // Save to DB via service (chat.service)
      io.to(room).emit('new_message', { sender: socket.user.id, text, timestamp: Date.now() });
    });

    socket.on('disconnect', () => {
      logger.info(`🔌 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};