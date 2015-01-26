var config = require('./../config').config;
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbOptions);

var getUserById = function(id, callback) {
    connection.query("select * from users where id = "+ id, function(err, rows){
        callback(err, rows[0]);
    });
};

var getUserByEmail = function(email, callback) {
    connection.query("select * from users where email = '" + email + "'", function(err, rows) {
        callback(err, rows);
    });
};

var createUser = function(userObj, callback) {
    var insertQuery = "INSERT INTO users ( email, name, password ) values ('" + userObj.email + "','" + userObj.nickname + "','" + userObj.password + "')";
    connection.query(insertQuery, function(err, rows) {
        callback(err, rows);
    });

};

module.exports = {
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    createUser: createUser
};