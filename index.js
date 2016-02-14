var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

io.on('connection', function(socket){
  socket.on('set tile', function(tileParam){
    io.emit('set tile', tileParam);
  });
});

app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
  console.log('Sighisoara listening on *:3000');
});