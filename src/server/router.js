var express = require('express');
var Promise = require('bluebird');
var db = Promise.promisifyAll(require('./db'));

//under construction!!!

module.exports = {

  videoQueue: [],

  syncVideoQueueOnPageLoad: function(req, res) {
    console.log('syncVideoQueueOnPageLoad fired');
    res.send(module.exports.videoQueue);
    console.log('syncVideoQueueOnPageLoad complete');
  },


  updateVideoQueueFromSocket: function(newQueue) {
    module.exports.videoQueue = newQueue;
    console.log('updateVideoQueue complete')
    console.log('videoQueue length: ', module.exports.videoQueue.length)
  },

  


}


//insert into currentqueue(currentqueue) values ([{"kind":"youtube#searchResult","etag":"abQHWywil_AkNqdqji7_FqiK-u4/3E7u1VZ18KYyfLIA6RgI2w-7nRI","id":{"kind":"youtube#video","videoId":"Pd6Ub7Ju2RM"},"snippet":{"publishedAt":"2015-02-13T18:50:38.000Z","channelId":"UCr5lOCcjZzNprLrhxO0WZQw","title":"Learn React, Flux, and Flow: Part I","description":"Brought to you by Formidable Labs and SeattleJS, Colin Megill walks us through Facebook's React framework in part one of this three-part series. The workshop ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/Pd6Ub7Ju2RM/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/Pd6Ub7Ju2RM/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/Pd6Ub7Ju2RM/hqdefault.jpg","width":480,"height":360}},"channelTitle":"","liveBroadcastContent":"none"}}])


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