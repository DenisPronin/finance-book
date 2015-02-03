var Debts = require('../models/Debts');
var moment = require("moment");

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

    app.put('/debts/add', function(req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var deadline = convertDeadline(req.body.deadline);

            var newDebt = {
                name: req.body.name,
                money: req.body.money,
                currency_id: req.body.currency_id,
                month_id: req.body.month_id,
                year: req.body.year,
                user_id: req.user.id,
                order_num: req.body.order_num,
                status_id: 3,
                deadline: deadline
            };
            Debts.addDebt(newDebt, function(err, debt) {
                if(err) {
                    return next(err);
                }
                res.json({
                    ok: true,
                    id: debt.insertId
                });
            });
        }
    });

    app.delete('/debts/:debtId', function(req, res, next) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var debtId = req.params.debtId;
            Debts.deleteDebt(debtId, function(err, debt) {
                if(err) {
                    return next(err);
                }
                res.json({
                    ok: true,
                    id: debtId
                });
            })
        }
    });

    app.post('/debts/edit', function(req, res, next) {
        var deadline = convertDeadline(req.body.deadline);

        var editingDebt = {
            id: req.body.id,
            name: req.body.name,
            money: req.body.money,
            currency_id: req.body.currency_id,
            month_id: req.body.month_id,
            year: req.body.year,
            user_id: req.user.id,
            order_num: req.user.order_num,
            status_id: 3,
            deadline: deadline
        };

        Debts.editDebt(editingDebt, function(err, debt) {
            if(err) {
                return next(err);
            }
            res.json({
                ok: true,
                id: editingDebt.id
            });
        });

    });

    var convertDeadline = function(deadline) {
        deadline = moment(deadline, 'DD/MM/YYYY');
        deadline = deadline.format('YYYY-MM-DD HH:mm:ss');
        return deadline;
    };

};
