var express = require('express');
var patio = require('patio');
var comb = require('comb');

// -- logging
var Logger = comb.logging.Logger;
var Level = comb.logging.Level;

// -- models
var User = require('./app/models/User');

module.exports = function(app) {

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

    setupModels(app);

    return app;
};


function setupModels(app) {

    new comb.logging.BasicConfigurator().configure();
    Logger.getLogger("patio").level = Level.INFO;

    var db = patio.createConnection({
        host: "localhost",
        port: 3306,
        type: "mysql",
        maxConnections: 10,
        minConnections: 5,
        user: "root",
        password: "",
        database: 'myDB'
    });

    comb.when(User(patio), function(User) {
        app.configure(function() {
            app.set('User', User);
        });
    });
}