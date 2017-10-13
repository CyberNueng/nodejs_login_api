var mysql  = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'myDB'
});

module.exports.pool = pool;

/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'myDB'
});

module.exports.connectDB = function(){
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    else console.log('connected to DB');
  });
}

module.exports.connection = connection;*/