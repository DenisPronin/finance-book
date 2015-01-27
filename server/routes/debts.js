var Debts = require('../models/Debts');

module.exports = function (app) {
    app.get('/debts/:monthId/:year', function (req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var user = req.user;
            Debts.getDebts(req.params.monthId, req.params.year, user.id, function(err, debts) {
                if(err) {
                    return next(err);
                }
                res.json(debts);
            });
        }
    });
};
