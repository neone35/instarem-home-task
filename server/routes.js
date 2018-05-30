const routes = require('next-routes')();

routes
  .add('index', '/')
  .add('search', '/search/', '/');

module.exports = routes;
