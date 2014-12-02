var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var config = require('./../config').config;
var path = require('path');
var http = require('http');

var mysql = require('mysql');
var myConnection = require('express-myconnection');

module.exports = function (app) {
    app.set('port', config.port);
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(methodOverride());
    app.use(express.static(path.join(__dirname + '../..', 'public')));

    /*
     * mysql connection
     * */
    app.use(myConnection(mysql, config.dbOptions, 'single')); // single, request

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

};
