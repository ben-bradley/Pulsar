// CONFIG
// ======
exports.config = {
  listenPort: "8080",
  sessionSecret: "secret",
  db: {
    host: "localhost",
    name: "pulsar",
    port: "27017"
  },
  api: '/api',
  schemas: '/schemas'
};
