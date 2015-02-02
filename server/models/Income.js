var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var common = require('./../common');

var incomeModel = {
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
    var fields = common.getFieldsFromModel(incomeModel, ['user_id']);
    connection.query('select ' + fields + ' from income where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

var addIncome = function(newIncome, callback) {
    var fields = common.getFieldsFromModel(incomeModel, ['id']);
    var query = 'insert into income (' + fields + ') values(' +
        '"' + newIncome.name + '",' +
        '"' + newIncome.money + '", ' +
        '"' + newIncome.currency_id + '", ' +
        '"' + newIncome.day + '", ' +
        '"' + newIncome.month_id + '", ' +
        '"' + newIncome.year + '", ' +
        '"' + newIncome.user_id + '", ' +
        '"' + newIncome.status_id + '"' +
        ')';

    connection.query(query, function(err, _income) {
        callback(err, _income);
    });
};

var deleteIncome = function(incomeId, callback) {
    var query = 'delete from income where id = ' + incomeId;
    connection.query(query, function(err, income) {
        callback(err, income);
    });
};

var editIncome = function(editingIncome, callback) {
    var fields = common.getFieldsFromModel(incomeModel, ['id']);
    var s = [];
    for (var field in incomeModel) {
        s.push(field + '="' + editingIncome[field] + '"');
    }
    s = s.join(',');
    var query = 'update income set ' + s + ' where id=' + editingIncome.id;
    connection.query(query, function(err, income) {
        callback(err, income);
    });
};


module.exports = {
    getIncome: getIncome,
    addIncome: addIncome,
    deleteIncome: deleteIncome,
    editIncome: editIncome
};