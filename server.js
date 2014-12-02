var express = require('express');
var http = require('http');

var app = express();

// boot
require('./server/boot/main')(app);

// routing
require('./server/routes/index')(app);

/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
