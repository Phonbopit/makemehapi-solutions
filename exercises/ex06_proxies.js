'use strict';

const hapi = require('hapi');
const server = new hapi.Server();
const path = require('path');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('h2o2'), (err) => {
  if (err) {
    throw err;
  }
});

server.route({
  method: 'GET',
  path: '/proxy',
  handler: {
    proxy: {
      host: '127.0.0.1',
      port: 65535
    }
  }
})

server.start(() => {
  console.log(`Server running at : ${server.info.uri}`);
});
