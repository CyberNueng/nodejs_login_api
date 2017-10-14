const bcrypt = require('bcryptjs');
const db = require('../model/db');
const pool = db.pool;

module.exports.getUserByemail = function(email, callback){
    var sql = 'SELECT * FROM account WHERE email = ?';
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(sql, [email],function (error, results, fields) {    
            connection.release();
            if (error) throw error;
            if (results.length==1) callback(null,results[0]);
            else callback(null);
        });
    });
}

module.exports.getUserByUserID = function(userID, callback){
    var sql = 'SELECT * FROM account WHERE userid = ?';
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(sql, [userID],function (error, results, fields) {    
            connection.release();
            if (error) throw error;
            if (results.length==1) callback(null,results[0]);
            else callback(null);
        });
    });
}

module.exports.updateTimeLogin = function(userID){
    var sql = 'UPDATE account SET time_signin=CURRENT_TIME() WHERE user_id=?';
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(sql, [userID],function (error, results, fields) {    
            connection.release();
            if (error) throw error;
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

