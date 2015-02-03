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

    app.put('/income/add', function(req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var newIncome = {
                name: req.body.name,
                money: req.body.money,
                currency_id: req.body.currency_id,
                user_id: req.user.id,
                day: req.body.day,
                month_id: req.body.month_id,
                year: req.body.year,
                status_id: 3
            };
            Income.addIncome(newIncome, function(err, income) {
                if(err) {
                    return next(err);
                }
                res.json({
                    ok: true,
                    id: income.insertId
                });
            });
        }
    });

    app.delete('/income/:incomeId', function(req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var incomeId = req.params.incomeId;
            Income.deleteIncome(incomeId, function(err, income) {
                if(err) {
                    return next(err);
                }
                res.json({
                    ok: true,
                    id: incomeId
                });
            })
        }
    });

    app.post('/income/edit', function(req, res, next) {
        var editingIncome = {
            id: req.body.id,
            name: req.body.name,
            money: req.body.money,
            currency_id: req.body.currency_id,
            user_id: req.user.id,
            day: req.body.day,
            month_id: req.body.month_id,
            year: req.body.year,
            status_id: req.body.status_id
        };

        Income.editIncome(editingIncome, function(err, income) {
            if(err) {
                return next(err);
            }
            res.json({
                ok: true,
                id: editingIncome.id
            });
        });

    });

};
