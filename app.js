var express = require('express');
var config = require('./config');
var routes = require('./routes');

module.exports = function() {

    var app = express.createServer();
    config(app);
    routes(app);

    return app;
};