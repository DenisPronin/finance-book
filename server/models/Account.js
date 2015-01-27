var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var common = require('./../common');

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
    var fields = common.getFieldsFromModel(account, ['user_id']);
    connection.query('select ' + fields + ' from accounts where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

var addAccount = function(newAccount, callback) {
    var fields = common.getFieldsFromModel(account, ['id']);
    var query = 'insert into accounts (' + fields + ') values(' +
        '"' + newAccount.name + '",' +
        '"' + newAccount.money + '", ' +
        '"' + newAccount.currency_id + '", ' +
        '"' + newAccount.month_id + '", ' +
        '"' + newAccount.year + '", ' +
        '"' + newAccount.user_id + '", ' +
        '"' + newAccount.order_num + '"' +
    ')';

    connection.query(query, function(err, account) {
        callback(err, account);
    })
};

module.exports = {
    getAccount: getAccount,
    addAccount: addAccount
};