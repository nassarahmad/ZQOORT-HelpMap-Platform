const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({ format: format.simple() }),
  ],
});

const httpLogger = morgan('dev');

module.exports = { logger, httpLogger };