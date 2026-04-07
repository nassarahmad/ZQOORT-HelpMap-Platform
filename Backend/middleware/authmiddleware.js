const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

module.exports = (roles = []) => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new Error('Unauthorized');

    if (roles.length && !roles.includes(user.role)) {
      throw new Error('Forbidden');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};