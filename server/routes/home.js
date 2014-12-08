var passport = require('passport');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('landing');
    });

    app.get('/login', function (req, res) {
        if(req.isAuthenticated()) {
            res.redirect('/book');
        }
        else {
            res.render('login', {
                message: req.flash('loginMessage')
            });
        }
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/book', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/sign_up', function (req, res) {
        res.render('sign_up', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/sign_up', passport.authenticate('local-signup', {
        successRedirect : '/book', // redirect to the secure profile section
        failureRedirect : '/sign_up', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/book', function (req, res) {
        res.render('layout');
    });

    app.get('/book/partials/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });


};

