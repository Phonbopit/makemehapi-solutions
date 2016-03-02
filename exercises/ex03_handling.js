'use strict';

const hapi = require('hapi');
const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('inert', (err) => {

  if (err) {
    throw err;
  }

}));

server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: __dirname + '/index.html'
  }
});

server.start(() => {
  console.log(`Server running at ${server.info.uri}`);
});
