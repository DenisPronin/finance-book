var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var common = require('./common');

var debts = {
    id: 'int',
    name: 'string',
    money: 'int',
    currency_id: 'int',
    month_id: 'int',
    year: 'int',
    user_id: 'int',
    order_num: 'int',
    status_id: 'int',
    deadline: 'date'
};

var getDebts = function(monthId, year, userId, callback) {
    var fields = common.getFieldsFromModel(debts);
    connection.query('select ' + fields + ' from debts where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

module.exports = {
    getDebts: getDebts
};