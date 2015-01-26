var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var account = {
    id: 'int',
    name: 'string',
    money: 'int',
    currency_id: 'int',
    month_id: 'int',
    year: 'int',
    user_id: 'int',
    order_num: 'int'
};

var getAccount = function(monthId, year, userId, callback) {
    var fields = Object.keys(account).filter(function(_field) {
        return (_field !== 'user_id');
    });
    fields = fields.join(',');
    connection.query('select ' + fields + ' from accounts where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

module.exports = {
    getAccount: getAccount
};