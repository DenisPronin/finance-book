var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var common = require('./../common');

var costModel = {
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
    var fields = common.getFieldsFromModel(costModel, ['user_id']);
    connection.query('select ' + fields + ' from costs where month_id = '+ monthId + ' and year = ' + year + ' and user_id=' + userId, function(err, rows){
        callback(err, rows);
    });
};

var addCost = function(newCost, callback) {
    var fields = common.getFieldsFromModel(costModel, ['id']);
    var query = 'insert into costs (' + fields + ') values(' +
        '"' + newCost.name + '",' +
        '"' + newCost.cost + '", ' +
        '"' + newCost.spend + '", ' +
        '"' + newCost.currency_id + '", ' +
        '"' + newCost.month_id + '", ' +
        '"' + newCost.year + '", ' +
        '"' + newCost.status_id + '", ' +
        '"' + newCost.user_id + '", ' +
        '"' + newCost.order_num + '"' +
        ')';

    connection.query(query, function(err, _cost) {
        callback(err, _cost);
    });
};

var deleteCost = function(costId, callback) {
    var query = 'delete from costs where id = ' + costId;
    connection.query(query, function(err, cost) {
        callback(err, cost);
    });
};

var editCost = function(editingCost, callback) {
    var fields = common.getFieldsFromModel(costModel, ['id']);
    var s = [];
    for (var field in costModel) {
        s.push(field + '="' + editingCost[field] + '"');
    }
    s = s.join(',');
    var query = 'update costs set ' + s + ' where id=' + editingCost.id;
    connection.query(query, function(err, cost) {
        callback(err, cost);
    });
};


module.exports = {
    getCost: getCost,
    addCost: addCost,
    deleteCost: deleteCost,
    editCost: editCost

};