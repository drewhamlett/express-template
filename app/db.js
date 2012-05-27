var patio = require('patio');
var comb = require('comb');
var dbConfig = require('./db.json');

// -- models
var User = require('./models/User');

module.exports = function(app) {

    patio.createConnection(dbConfig);

    comb.when(User(patio), function(User) {
        app.configure(function() {
            app.set('User', User);
        });
    });

};