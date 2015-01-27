var Cost = require('../models/Cost');

module.exports = function (app) {
    app.get('/costs/:monthId/:year', function (req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var user = req.user;
            Cost.getCost(req.params.monthId, req.params.year, user.id, function(err, costs) {
                if(err) {
                    return next(err);
                }
                res.json(costs);
            });
        }
    });
};
