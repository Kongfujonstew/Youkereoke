
var mongoose = require('mongoose');

mongoose.connect('mongodb://yko:yko@cluster0-shard-00-00-zblxo.mongodb.net:27017,cluster0-shard-00-01-zblxo.mongodb.net:27017,cluster0-shard-00-02-zblxo.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('were connected!');
});

// var Queue = mongoose.model('Queue', new mongoose.Schema({ queue: String }));



var schema = new mongoose.Schema({ queue: 'String' });


var Queue = mongoose.model('Queue', schema, 'queues');


db.collections.queues.drop()

currentQueue = new Queue ({
  queue: '[]'
})

currentQueue.save();

module.exports = {
  db: db,
  Queue: Queue
}




// var db = mysql.createConnection({
//   user: 'root',
//   password: 'plantlife'
// })

// db.connect();


// module.exports = db;


//HERE IS THE QUERY to set up the right db:

// db.query(`CREATE DATABASE IF NOT EXISTS videoqueue;
//   USE videoqueue;
  // CREATE TABLE IF NOT EXISTS currentqueue (
  // id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  // currentqueue json NOT NULL
  // );

// )`);
