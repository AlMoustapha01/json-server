// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const path = require('path');

const server = jsonServer.create();

// Use db.js instead of db.json
const dbPath = path.join(__dirname, '..', 'db.js');
const data = require(dbPath);
const router = jsonServer.router(data());

const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);
server.listen(3002, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
