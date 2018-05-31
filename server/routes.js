const routes = require('next-routes')();

routes
  .add('index', '/')
  .add('search', '/api/search', '/');

module.exports = routes;
