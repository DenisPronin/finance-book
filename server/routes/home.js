var passport = require('passport');

module.exports = function (app) {
    app.get('/', function (req, res) {
        if(!req.isAuthenticated()) {
            res.render('landing', {
                message: req.flash('message')
            });
        }
        else {
            res.redirect('/book');
        }
    });

    app.get('/sign_up', function (req, res) {
        res.render('sign_up', {
            message: req.flash('message')
        });
    });

    app.get('/book', function (req, res) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            res.render('layout');
        }
    });

    app.get('/book/partials/:name', function (req, res) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var name = req.params.name;
            res.render('partials/' + name);
        }
    });

};

