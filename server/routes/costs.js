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

    app.put('/costs/add', function(req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var newCost = {
                name: req.body.name,
                cost: req.body.cost,
                spend: req.body.spend,
                currency_id: req.body.currency_id,
                month_id: req.body.month_id,
                year: req.body.year,
                status_id: 3,
                user_id: req.user.id,
                order_num: req.body.order_num
            };
            Cost.addCost(newCost, function(err, cost) {
                if(err) {
                    return next(err);
                }
                res.json({
                    ok: true,
                    id: cost.insertId
                });
            });
        }
    });

    app.delete('/costs/:costId', function(req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var costId = req.params.costId;
            Cost.deleteCost(costId, function(err, cost) {
                if(err) {
                    return next(err);
                }
                res.json({
                    ok: true,
                    id: costId
                });
            })
        }
    });

    app.post('/costs/edit', function(req, res, next) {
        var editingCost = {
            id: req.body.id,
            name: req.body.name,
            cost: req.body.cost,
            spend: req.body.spend,
            currency_id: req.body.currency_id,
            month_id: req.body.month_id,
            year: req.body.year,
            status_id: 3,
            user_id: req.user.id,
            order_num: req.body.order_num
        };

        Cost.editCost(editingCost, function(err, cost) {
            if(err) {
                return next(err);
            }
            res.json({
                ok: true,
                id: editingCost.id
            });
        });

    });

};
