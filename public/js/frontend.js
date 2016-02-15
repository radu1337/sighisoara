var socket = io();

//console.log(socket);

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

// data

var tiles = [
  { id:      "001",
    top:     "castle",
    right:   "field",
    bottom:  "field",
    left:    "castle"
  },
  { id:      "002",
    top:     "field",
    right:   "field",
    bottom:  "road",
    left:    "field"
  },
  { id:      "003",
    top:     "castle",
    right:   "road",
    bottom:  "road",
    left:    "field"
  }
];

// functions

var sellectTile = function() {
  var randomTile = tiles[Math.floor(Math.random()*tiles.length)];

  $("#user_tile").html("<img src=\"images/tile_" +  randomTile.id + ".png\" alt=\"Tile 001\" />");

  //console.log(randomTile);
};

// init

sellectTile();

// actions

$("#chat").on("mouseup", function () {
  $('input#mess', this).focus();
});

$("#user_tile").on("mousedown", function(){
  console.log(1);
  sellectTile();
});




