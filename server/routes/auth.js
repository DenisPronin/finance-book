var passport = require('passport');

module.exports = function (app) {
    app.get('/auth', function (req, res) {

        if (req.isAuthenticated()) {
            res.redirect('/book');
            return;
        }

        res.render('layout', {
            error: req.flash('error')
        });
    });

    app.get('/sign-out', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/auth', passport.authenticate('local', {
        successRedirect: '/auth',
        failureRedirect: '/auth',
        failureFlash: true
    }));

};