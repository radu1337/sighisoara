var socket = io();

console.log(socket);

$('form#chat').submit(function(){
  socket.emit('chat message', $('#mess').val());
  $('#mess').val('');
  return false;
});

// set username

//send message
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('set tile', function(tileParams){
  console.log(tileParams);
});

// keep input focused

$("#chat").on("mouseup", function () {
    $('input#mess', this).focus();
});

// tiles and tile sellection

var tiles = [
  { id:      "001",
    top:     "castle",
    right:   "field",
    bottom:  "field",
    left:    "castle"
  },
  { id:      "002",
    top:     "field",
    right:   "road",
    bottom:  "field",
    left:    "road"
  },
  { id:      "003",
    top:     "castle",
    right:   "field",
    bottom:  "road",
    left:    "field"
  }
];

var randomTile = tiles[Math.floor(Math.random()*tiles.length)];