var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var income = {
    id: 'int',
    name: 'string',
    money: 'int',
    currency_id: 'int',
    day: 'int',
    month_id: 'int',
    year: 'int',
    user_id: 'int',
    status_id: 'int'
};

var getIncome = function(monthId, year, userId, callback) {
    var fields = Object.keys(income).filter(function(_field) {
        return (_field !== 'user_id');
    });
    fields = fields.join(',');
    connection.query('select ' + fields + ' from income where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

module.exports = {
    getIncome: getIncome
};