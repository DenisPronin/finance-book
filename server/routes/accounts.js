var Accounts = require('../models/Account');

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

    app.put('/accounts/add', function(req, res) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var newAccount = {
                name: req.body.name,
                money: req.body.money,
                currency_id: req.body.currency_id,
                user_id: req.user.id,
                month_id: req.body.month_id,
                year: req.body.year,
                order_num: req.body.order_num
            };
            Accounts.addAccount(newAccount, function(err, account) {
                if(err) {
                    return done(err);
                }
                res.json({
                    ok: true,
                    id: account.insertId
                });
            });
        }
    });
};
