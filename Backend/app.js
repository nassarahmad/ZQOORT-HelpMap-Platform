const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const envValidator = require('./middleware/envValidator');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const routes = require('./routes');

const app = express();

envValidator();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: Number(config.RATE_LIMIT_WINDOW) * 60 * 1000,
  max: Number(config.RATE_LIMIT_MAX),
  message: 'Too many requests, please try again later.'
});
app.use('/api', limiter);

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;