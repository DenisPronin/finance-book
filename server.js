var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('error-handler');
var logger = require('morgan');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var myConnection = require('express-myconnection');

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fb_finance'
};


var routes = require('./routes');
var api = require('./routes/api');

var app = module.exports = express();

app.set('port', process.env.PORT || 5353);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

/*
* mysql connection
* */
app.use(myConnection(mysql, dbOptions, 'single'));

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

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

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});