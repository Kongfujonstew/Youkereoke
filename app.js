var express = require("express");
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//server and socket io requires
var port = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);
global.io = require('socket.io')(http);

//require other modules from the project
var router = require('./src/server/router');

// app.engine('jade', require('jade').__express)
// app.set('view engine', 'jade')


//serving static data and using router for routes
app.use(express.static('src/client'));
app.use(favicon('src/client/images/microphone.png')); //not sure why this isn't working . . .

app.get('/test', router.get);

//use other helpful stuff
app.use(morgan('dev'));
app.use(bodyParser.json());


// instantiate the socket io connection
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('test', function() {
    console.log('test received');
  });
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  })
});


//instantiate server
http.listen(port, function() {
  console.log("Listening on port " + port);
})

