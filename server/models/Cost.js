var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var common = require('./../common');

var cost = {
    id: 'int',
    name: 'string',
    cost: 'int',
    spend: 'int',
    currency_id: 'int',
    month_id: 'int',
    year: 'int',
    status_id: 'int',
    user_id: 'int',
    order_num: 'int'
};

var getCost = function(monthId, year, userId, callback) {
    var fields = common.getFieldsFromModel(cost, ['user_id']);
    connection.query('select ' + fields + ' from costs where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

module.exports = {
    getCost: getCost
};