const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const morgan = require('morgan');
const events = require('events');
const compression = require('compression');
const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');


module.exports = (apiVersion) => (router) => (logger = console) => {
  const errEmitter = new events.EventEmitter();

  const app = express();

  // check time response
  // app.use(morgan('dev'));

  app.get('/', (req, res) => res.sendFile(path.resolve(`${__dirname}/public/index.html`)));

  app.use(helmet());

  app.use(compression());

  app.use(cors({
    credentials: true,
    origin: [],
    optionsSuccessStatus: 200,
  }));

  app.use(
    bodyParser.urlencoded({
      limit: '1mb',
      extended: true,
    }),
  );

  app.use(bodyParser.json());


  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      meta: false,
      expressFormat: true,
      colorize: true,
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );


  app.use((req, res, next) => (req.method !== 'GET'
    && !/application\/json/.test(req.headers['content-type'])
    ? (() => {
      errEmitter.emit('error', {
        errors: [{ code: 415, message: 'unsupported media type' }],
      });
      res.status(415).json({
        status: 0,
        reason: 'unsupported media type',
        errors: [{ code: 415, message: 'unsupported media type' }],
      });
    })()
    : next()));


  app.use(apiVersion, router);

  app.use(async (req, res, next) => {
    res.status(404).json({
      status: 0,
      reason: 'resource not found',
      errors: [{ code: 404, message: 'resource not found' }],
    });

    errEmitter.emit('error', {
      errors: [{ code: 404, message: 'not found' }],
    });

    await next();
  });


  app.use(async (err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    res.status(err.status || 500).json({
      status: 0,
      reason: 'unexpected error',
      errors: [{ code: 500, message: 'unexpected error' }],
    });

    errEmitter.emit('error', {
      errors: [{ code: 500, message: 'unexpected error' }],
    });

    await next();
  });

  errEmitter.on('error', (errors) => {
    logger.error(errors);
  });

  return app;
};
