module.exports = function(patio) {

    //returns a promise(to be redeemed in app config)
    return patio.addModel("user", {
        static: {
            findUsers: function() {
                console.log("findUsers called");
            }
        }
    });
};