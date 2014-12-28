var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

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
    connection.query("select * from users where id = "+ id, function(err, rows){
        done(err, rows[0]);
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
            connection.query("select * from users where email = '" + email + "'", function(err, rows) {
                if(err) {
                    return done(err);
                }
                if (!rows.length) {
                    return done(null, false, req.flash('message', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    return done(null, false, req.flash('message', 'Wrong password.'));
                }

                // all is well, return successful user
                return done(null, rows[0]);
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

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("select * from users where email = '" + email + "'", function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('message', 'That email is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = {
                        email: email,
                        nickname: req.body.nickname || '',
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO users ( email, name, password ) values ('" + newUserMysql.email + "','" + newUserMysql.nickname + "','" + newUserMysql.password + "')";

                    connection.query(insertQuery,function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
);


module.exports = function (app) {
};
