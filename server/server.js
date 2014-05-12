// DEPENDENCIES
// ============
var express   = require('express'),
    http      = require('http'),
    faye      = require('faye'),
    mongoose  = require('mongoose'),
    fs        = require('fs'),
    path      = require('path');

var config    = global.config = require('./config/config.js').config,
    port      = (process.env.PORT || config.listenPort),
    paths     = {
      api     : path.resolve(__dirnam+config.api),
      schema  : path.resolve(__dirname+config.schemas)
    };

var dbstring  = 'mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name,
    db        = mongoose.createConnection(dbstring),
    schemas   = {};

var app       = express(),
    server    = http.createServer(app),
    bayeux    = new faye.NodeAdapter({ mount: '/pubsub' });

// DATABASE CONFIGURATION
// ======================
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + config.db.name);
  fs.readdir(paths.schema, function(err, files) {
    files.forEach(function(file) {
      if (!/\.js$/.test(file)) return false;
      var Schema = require(paths.schema+'/'+file);
      schemas[Schema.name] = new Schema(db);
    });
  });
});

// APP CONFIGURATION
// =================
app.configure(function() {
  app.use(express['static'](__dirname + '/../public'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: config.sessionSecret }));
  app.use(app.router);
});

// READ THE API MODULES
// ====================
fs.readdir(paths.api, function(err, files) {
  files.forEach(function(file) {
    if (!/\.js$/.test(file)) return false;
    var api = require(paths.api+'/'+file);
    api(app, schemas);
  });
});

// KICK THIS PIG!
// ==============
bayeux.attach(server);
server.listen(port);

console.log('\n\nWelcome to Stacked!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js\n\n');
