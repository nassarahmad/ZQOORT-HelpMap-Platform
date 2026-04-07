const { logger } = require('../utils/logger');


const validationErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = err.errors.map(e => ({ field: e.path, message: e.msg }));
    return res.status(400).json({ success: false, message: 'Validation failed',  errors });
  }
  next(err);
};


const errorHandler = (err, req, res, next) => {
  logger.error(`🔥 ${req.method} ${req.url} - ${err.message}`);
  
  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;
  
  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};

module.exports = { validationErrorHandler, errorHandler };