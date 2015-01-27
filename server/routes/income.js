var Income = require('../models/Income');

module.exports = function (app) {
    app.get('/income/:monthId/:year', function (req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var user = req.user;
            Income.getIncome(req.params.monthId, req.params.year, user.id, function(err, income) {
                if(err) {
                    return next(err);
                }
                res.json(income);
            });
        }
    });
};
