var Cost = require('../models/Cost');

module.exports = function (app) {
    app.get('/costs/:monthId/:year', function (req, res) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var user = req.user;
            Cost.getCost(req.params.monthId, req.params.year, user.id, function(err, costs) {
                if(err) {
                    return done(err);
                }
                res.json(costs);
            });
        }
    });
};
