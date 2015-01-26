var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var User = require('../models/User');

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user){
        done(err, user);
        console.log('User Id:', id);
    });
});

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {
    if(email) {
            email = email.toLowerCase();
            User.getUserByEmail(email, function(err, users){
                if(err) {
                    return done(err);
                }
                if (!users.length) {
                    return done(null, false, req.flash('message', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                var user = users[0];
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, req.flash('message', 'Wrong password.'));
                }
                // all is well, return successful user
                return done(null, user);
            });
        }
}));

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use(
    'local-signup',
    new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            confirmPasswordField : 'confirmPassword',
            nickField : 'nickname',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            if(password !== req.body.confirmPassword) {
                return done(null, false, req.flash('message', 'Confirmed password is wrong!'));
            }

            var nickname = req.body.nickname;
            if(!nickname) {
                return done(null, false, req.flash('message', 'Name is required field!'));
            }

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.getUserByEmail(email, function(err, users) {
                if (err)
                    return done(err);
                if (users.length) {
                    return done(null, false, req.flash('message', 'That email is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = {
                        email: email,
                        nickname: nickname,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    User.createUser(newUser, function(err, rows){
                        newUser.id = rows.insertId;
                        return done(null, newUser);
                    });
                }
            });
        })
);


module.exports = function (app) {
};
