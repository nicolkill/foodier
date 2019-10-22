const winston = require('winston');
const httpContext = require('express-http-context');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({}),
  ],
});

const printWithRequestId = (level, data) => logger.log({
  level,
  message: data,
  requestId: httpContext.get('requestId'),
});

const customLogger = {};
[
  'info',
  'warn',
  'debug',
  'silly',
  'error',
  'verbose',
].forEach((f) => {
  customLogger[f] = data => printWithRequestId(f, data);
});

module.exports = customLogger;
