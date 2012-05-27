module.exports = function(app) {
 
    var controller = {

        index: function(req, res, next) {

            app.settings.User.findUsers();

            res.render('index', {
                title: "Index"
            });
        }
    };

    return controller;
};