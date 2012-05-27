var express = require('express');
var comb = require('comb');

var db = require('./db');

// -- logging
var Logger = comb.logging.Logger;
var Level = comb.logging.Level;

module.exports = function(app) {

    new comb.logging.BasicConfigurator().configure();
    Logger.getLogger("patio").level = Level.INFO;
    db(app);

    // Configuration
    app.configure(function() {
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    app.configure('production', function() {
        app.use(express.errorHandler());
    });


    return app;
};