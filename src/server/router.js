var express = require('express');
var Promise = require('bluebird');
var db = Promise.promisifyAll(require('./db'));

//under construction!!!

module.exports = {

  videoQueue: [],

  syncVideoQueueOnPageLoad: function(req, res) {
    console.log('syncVideoQueueOnPageLoad fired');
    res.send(module.exports.videoQueue);
  },


  updateVideoQueueFromSocket: function(newQueue) {
    module.exports.videoQueue = newQueue;
    console.log('updateVideoQueue fired, queuelength: ', newQueue.length)
  }


}
