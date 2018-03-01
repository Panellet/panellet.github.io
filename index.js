//Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2)
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//We define a route handler / that gets called when we hit our website home.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html'); //we’re calling res.send and pass it a HTML string. Our code would look very confusing if we just placed our entire application’s HTML there. Instead, we’re going to create a index.html file and serve it.
});

io.on('connection', function(socket){
    console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);

  });
});




//We make the http server listen on port 3000.
var SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 443,
SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

http.listen(SERVER_PORT, SERVER_IP, function() {
console.log('Listening on ' + SERVER_PORT + ':' + SERVER_IP);
});
