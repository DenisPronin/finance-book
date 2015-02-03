var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var common = require('./../common');

var debtsModel = {
    id: 'int',
    name: 'string',
    money: 'int',
    currency_id: 'int',
    user_id: 'int',
    order_num: 'int',
    month_id: 'int',
    year: 'int',
    status_id: 'int',
    deadline: 'date'
};

var getDebts = function(monthId, year, userId, callback) {
    var fields = common.getFieldsFromModel(debtsModel, ['user_id']);
    connection.query('select ' + fields + ' from debts where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

var addDebt = function(newDebt, callback) {
    var fields = common.getFieldsFromModel(debtsModel, ['id']);
    var query = 'insert into debts (' + fields + ') values(' +
        '"' + newDebt.name + '",' +
        '"' + newDebt.money + '", ' +
        '"' + newDebt.currency_id + '", ' +
        '"' + newDebt.user_id + '", ' +
        '"' + newDebt.order_num + '", ' +
        '"' + newDebt.month_id + '", ' +
        '"' + newDebt.year + '", ' +
        '"' + newDebt.status_id + '"' +
        '"' + newDebt.deadline + '"' +
        ')';

    connection.query(query, function(err, debt) {
        callback(err, debt);
    });
};

var deleteDebt = function(debtId, callback) {
    var query = 'delete from debts where id = ' + debtId;
    connection.query(query, function(err, debt) {
        callback(err, debt);
    });
};

var editDebt = function(editingDebt, callback) {
    var fields = common.getFieldsFromModel(debtsModel, ['id']);
    var s = [];
    for (var field in debtsModel) {
        s.push(field + '="' + editingDebt[field] + '"');
    }
    s = s.join(',');
    var query = 'update debts set ' + s + ' where id=' + editingDebt.id;
    connection.query(query, function(err, debt) {
        callback(err, debt);
    });
};

module.exports = {
    getDebts: getDebts,
    addDebt: addDebt,
    deleteDebt: deleteDebt,
    editDebt: editDebt

};