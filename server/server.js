// Only ES5 (old) is allowed in this file, but ES6 can be used in required files
require('babel-register');

// routes
const getRootUrl = require('../lib/getRootUrl').default;
const battleRoutes = require('./routes/battleRoutes').default;
// server dependencies
const express = require('express');
const next = require('next');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// server config
const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const ROOT_URL = getRootUrl();
// map .env file vars into process.env
if (dev) require('dotenv').config(); // eslint-disable-line
const { MONGO_URL } = process.env;
mongoose.connect(MONGO_URL);

app.prepare()
  .then(() => {
    const server = express();
    server.use(compression()); // compress files for faster load
    server.use(bodyParser.json());

    battleRoutes(server);
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err; // eslint-disable-next-line no-console
      console.log(`> Ready on ${ROOT_URL}`);
    });
  })
  .catch((ex) => { // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
