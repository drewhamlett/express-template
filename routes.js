module.exports = function(app) {

    //require controllers
    var application = require('./app/controllers/application')(app);

    //define routes
    app.get('/', application.index);

    return app;
};