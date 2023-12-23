const http = require('http');
const routes = require('./routes');

console.log('hello world');

const server = http.createServer(routes);

server.listen(3000);

