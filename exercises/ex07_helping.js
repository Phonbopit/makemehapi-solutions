'use strict';

const hapi = require('hapi');
const server = new hapi.Server();
const path = require('path');
const helper = require('./helpers/helper');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('vision'), (err) => {
  if (err) {
    throw err;
  }
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'templates'),
  helpersPath: path.join(__dirname, 'helpers')
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: 'template.html'
  }
});


server.start(() => {
  console.log(`Server running at : ${server.info.uri}`);
});
