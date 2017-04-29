var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: 'plantlife'
})

db.connect();


module.exports = db;


//HERE IS THE QUERY to set up the right db:

// db.query(`CREATE DATABASE IF NOT EXISTS videoqueue;
//   USE videoqueue;
//   CREATE TABLE IF NOT EXISTS currentqueue (
//   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   currentqueue VARCHAR(20000) NOT NULL
//   );

// )`);
