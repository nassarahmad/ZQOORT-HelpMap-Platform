const http = require('http');
const app = require('./app');
const connectDB = require('./db/connect');
const config = require('./config');
const initSocket = require('./socket');
const logger = require('./utils/logger');

const server = http.createServer(app);
const io = initSocket(server);

connectDB().then(() => {
  server.listen(config.PORT, () => {
    logger.info(`🚀 Server running on port ${config.PORT} [${config.NODE_ENV}]`);
  });
});

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
  logger.info('🛑 Shutting down gracefully...');
  server.close(() => {
    logger.info('✅ Server closed');
    process.exit(0);
  });
}