const { validateEnv } = require('../config/validation');
module.exports = (req, res, next) => {
  validateEnv();
  next();
};