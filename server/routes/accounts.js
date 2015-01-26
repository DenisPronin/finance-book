var Accounts = require('../models/accounts');

module.exports = function (app) {
    app.get('/accounts/:monthId/:year', function (req, res) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var user = req.user;
            Accounts.getAccount(req.params.monthId, req.params.year, user.id, function(err, accounts) {
                if(err) {
                    return done(err);
                }
                res.json(accounts);
            });
        }
    });
};
