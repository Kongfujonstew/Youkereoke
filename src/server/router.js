var express = require('express');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var db = require('./db').db;
var Queue = require('./db').Queue;
// var Queue = require('./db').Queue;
// var db = Promise.promisifyAll(require('./db'));

// var db = mongoose.connection;


var deleteCollection = function(queue) {
  return new Promise(function(resolve, reject) {
    db.collections.queues.drop(function(err, somedata) {
      if(err) {
        reject(err);
      } else {
        console.log('deleted.');
        resolve(queue);
      }
    })
  });

} 


module.exports = {

  videoQueue: '[]',

  syncFromDBForNewClient: function() {
    return new Promise(function(resolve, reject) {
      db.collections.queues.findOne(function(err, queueData) {
        if (err) {
          reject(err);
        } else {
          console.log('queueData: ', queueData);  
          resolve(queueData.queue);
        }
      });
    });
  },

  updateVideoQueueFromSocket: function(newQueue) {
    console.log('adding queue to db, length: ', newQueue.length)
    deleteCollection(newQueue)
    .then(function(newQueue) {

      var currentQueue = new Queue ({
        queue: JSON.stringify(newQueue)
      })

      currentQueue.save();

      console.log('a newQueue was added: ', newQueue)
    })


  },

}






//use server cachemem:

// module.exports = {

//   videoQueue: [],

//   syncVideoQueueOnPageLoad: function(req, res) {
//     console.log('syncVideoQueueOnPageLoad fired');
//     res.send(module.exports.videoQueue);
//     console.log('syncVideoQueueOnPageLoad complete');
//   },


//   updateVideoQueueFromSocket: function(newQueue) {
//     module.exports.videoQueue = newQueue;
//     console.log('updateVideoQueue complete')
//     console.log('videoQueue length: ', module.exports.videoQueue.length)
//   },




// }






//MYSQL

// module.exports = {

//   videoQueue: [],

//   syncVideoQueueOnPageLoad: function(req, res) {
//     console.log('syncVideoQueueOnPageLoad fired');
//     db.queryAsync(`use videoqueue;`)
//       .then(function() {
//         db.queryAsync(`select * from currentqueue`)
//       .then(function(data) {
//         console.log(JSON.stringify(data));
//         res.send(data);
//       });
//     });
//     console.log('syncVideoQueueOnPageLoad complete');
//   },


//   updateVideoQueueFromSocket: function(newQueue) {
//     // module.exports.videoQueue = newQueue;
//     var escapeJSON = function(str) {
//       return str.replace(/\\/g,'\\');
//     };
//     var stringQ = JSON.stringify(newQueue);
//     var escapeStringQ = escapeJSON(stringQ);

//     console.log('escapeStringQ: ', escapeStringQ);
//     db.queryAsync(`use videoqueue;`)
//       .then(function() {
//         db.queryAsync(`truncate currentqueue;`)
//       .then(function() {
//         db.queryAsync(`insert into currentqueue(currentqueue) values(?) ${stringQ}`);
//       })

//     });
//     console.log('updateVideoQueue complete')
//   }


// }