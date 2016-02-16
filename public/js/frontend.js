var socket = io.connect();

//console.log(socket);

// functions
var getRandomTile = function(){
  socket.emit('sellect random tile');
}

// set username
$('form#submit_username').submit(function(e){
  e.preventDefault();
  socket.emit('new user', $('#username').val(), function(data){
    //console.log(data);
    if(data){
      $('#username_box').hide();
      $('#chat, #game').show();
      getRandomTile();
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

socket.on('new tile', function(data){
  $('#game').html('<img src=\"images/tile_' +  data.id + '.png\" alt=\"Tile 001\" />');
});

// actions

$('#chat').on('mouseup', function() {
  $('input#mess', this).focus();
});

$('#game').on('mousedown', function(){
  getRandomTile();
});




