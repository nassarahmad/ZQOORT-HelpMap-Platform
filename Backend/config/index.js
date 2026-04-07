const dotenv = require('dotenv');


const path = require('path');
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
dotenv.config({ path: path.resolve(process.cwd(), '.env') }); // fallback

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  db: { uri: process.env.MONGODB_URI },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  },
};
