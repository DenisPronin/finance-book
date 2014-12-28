var passport = require('passport');

module.exports = function (app) {

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/book', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/sign_up', passport.authenticate('local-signup', {
        successRedirect : '/book', // redirect to the secure profile section
        failureRedirect : '/sign_up', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};
