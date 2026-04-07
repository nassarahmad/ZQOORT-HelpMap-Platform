const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Unauthorized WS'));
    const decoded = jwt.verify(token, config.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Invalid WS Token'));
  }
};