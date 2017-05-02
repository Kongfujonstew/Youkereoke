var express = require("express");
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');

//server and socket io requires
var port = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);
global.io = require('socket.io')(http);

//require other modules from the project
var router = require('./src/server/router');
// var db = Promise.promisifyAll(require('./src/server/router'));

// app.engine('jade', require('jade').__express)
// app.set('view engine', 'jade')


//serving static data and using router for routes
app.use(express.static('src/client'));
app.use(favicon('src/client/images/microphone.png')); //not sure why this isn't working . . .


//use other helpful stuff
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/videoqueue', router.syncFromDBForNewClient);


// instantiate the socket io connection
io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('newClientConnect');
  socket.on('addSongToQueue', function(newQueue) {
    console.log('addSong received');
    io.emit('updateQueue', newQueue);
    router.updateVideoQueueFromSocket(newQueue);
  });
  socket.on('socketRequestUpdate', function() {
    console.log('socketRequestUpdate received');
    router.syncFromDBForNewClient()
    .then(function(currentQueueString) {
      var currentQueue = JSON.parse(currentQueueString);
      console.log('SENDING QUEUE :', currentQueue)
      io.to(socket.id).emit('updateQueue', currentQueue);
    })
  })
  socket.on('socketUpdateQueue', function(newQueue) {
    console.log('socketUpdateQueue received');
    io.emit('updateQueue', newQueue);
    router.updateVideoQueueFromSocket(newQueue);
  })
  socket.on('socketSendMessage', function(message) {
    console.log('new message received and sent');
    io.emit('ioDeliverNewMessage', message);
  })
  socket.on('disconnect', function() {
    console.log('a user disconnected');
    io.emit('clientDisconnect');
  })
});

//////////////


//instantiate server
http.listen(port, function() {
  console.log("Listening on port " + port);
})

