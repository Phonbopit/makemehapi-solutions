'use strict';

const hapi = require('hapi');
const path = require('path');
const inert = require('inert');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
});

server.route({
  path: '/foo/bar/baz/{filename}',
  method: 'GET',
  handler: {
    directory: {
      path: path.join(__dirname, 'public')
    }
  }
});

server.start(() => {
  console.log(`Server running at : ${server.info.uri}`);
});
