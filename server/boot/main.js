var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var morgan = require('morgan');
var config = require('./../config').config;
var path = require('path');
var http = require('http');
var passport = require('passport');
var flash = require('connect-flash');

var session = require('express-session');

module.exports = function (app) {
    require("./passport")(app);

    app.set('port', config.port);
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');

    if (app.get('env') == 'development') {
        var accessLogStream = fs.createWriteStream(__dirname + '/../../errors.log', {flags: 'a'});
        app.use(morgan('common', {stream: accessLogStream }));
    } else {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, '../../public')));

    app.use(session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());



};
