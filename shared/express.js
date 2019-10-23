const httpContext = require('express-http-context');
const uuid = require('uuid/v4');
const express = require('express');
const bodyParser = require('body-parser');

const Router = require('./router');
const logger = require('./logger');

const app = express();

module.exports = function () {
  app.use(express.static('./public', { maxAge: '1y' }));
  app.use(express.static('./data', { maxAge: '1d' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(httpContext.middleware);

  app.use((req, res, next) => {
    const now = Date.now();

    const chunks = [];
    const oldWrite = res.write;
    const oldEnd = res.end;

    httpContext.set('requestId', uuid());

    res.write = function (chunk) {
      chunks.push(chunk);

      oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk) {
        chunks.push(chunk);
      }

      let body = '{}';
      const contentType = res.getHeader('content-type');
      if (contentType && contentType.indexOf('application/json') >= 0 && chunks.length > 0) {
        body = Buffer.isBuffer(chunks[0]) ? Buffer.concat(chunks).toString('utf8') : chunks[0];
      }

      try {
        body = JSON.parse(body);
      } catch (error) {
        logger.error({
          body,
          error: error.message,
          stack: error.stack,
        });
        body = {};
      }

      logger.info({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: (Date.now() - now) / 1000,
        request: req.body,
        response: body,
      });

      oldEnd.apply(res, arguments);
    };

    next();
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
    res.header('Access-Control-Allow-Credentials', process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS);
    res.header('Access-Control-Expose-Headers', process.env.ACCESS_CONTROL_EXPOSE_HEADERS);
    res.header('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS);
    next();
  });

  const router = Router();

  require('../app/food/food.route')(router);
  require('../app/user/user.route')(router);

  app.use('/', router);

  return app;
};
