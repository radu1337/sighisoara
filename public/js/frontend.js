var socket = io.connect();

//console.log(socket);

// set username
$('form#submit_username').submit(function(e){
  e.preventDefault();
  socket.emit('new user', $('#username').val(), function(data){
    //console.log(data);
    if(data){
      $('#username_box').hide();
      $('#chat, #game').show();
      sellectTile();
    } else{
      $('#username').val('');
    }
  });
});

//send and receive messages
$('form#chat').submit(function(e){
  e.preventDefault();
  socket.emit('send message', $('#mess').val());
  $('#mess').val('');
});

socket.on('new message', function(data){
  $('#messages').append('<li><strong>' + data.nick + ':</strong> ' + data.msg + '</li>');
});

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

// functions

var sellectTile = function() {
  var randomTile = tiles[Math.floor(Math.random()*tiles.length)];

  $('#game').html('<img src=\"images/tile_' +  randomTile.id + '.png\" alt=\"Tile 001\" />');

  //console.log(randomTile);
};

// actions

$('#chat').on('mouseup', function () {
  $('input#mess', this).focus();
});

$('#game').on('mousedown', function(){
  sellectTile();
});




