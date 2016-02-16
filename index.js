var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nicknames = [];

// data

var tiles = [
  { id:      '000',
    top:     'castle',
    right:   'road',
    bottom:  'field',
    left:    'road'
  },
  { id:      '001',
    top:     'castle',
    right:   'field',
    bottom:  'field',
    left:    'castle'
  },
  { id:      '002',
    top:     'field',
    right:   'field',
    bottom:  'road',
    left:    'field'
  },
  { id:      '003',
    top:     'castle',
    right:   'road',
    bottom:  'road',
    left:    'field'
  },
  { id:      '004',
    top:     'field',
    right:   'castle',
    bottom:  'field',
    left:    'castle'
  },
  { id:      '005',
    top:     'field',
    right:   'field',
    bottom:  'road',
    left:    'road'
  },
  { id:      '006',
    top:     'road',
    right:   'road',
    bottom:  'road',
    left:    'road'
  }
];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
  socket.on('new user', function(data, callback){
    if (nicknames.indexOf(data) != -1){
      callback(false);
    } else{
      callback(true);
      console.log(data + ' has connected...');
      socket.nickname = data;
      nicknames.push(socket.nickname);
    }
  });

  socket.on('sellect random tile', function (){
    var randomTile = tiles[Math.floor(Math.random()*tiles.length)];
    console.log(randomTile);
    io.sockets.emit('new tile', randomTile);
  });

  socket.on('send message', function(data){
    io.sockets.emit('new message', {msg: data, nick: socket.nickname});
  });
  
  socket.on('disconnect', function(data){
    if(!socket.nickname) return;
    nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    console.log(socket.nickname + ' has disconnected...');
  });
});

app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
  console.log('Sighisoara listening on *:3000');
});