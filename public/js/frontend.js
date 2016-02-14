var socket = io();
$('form#chat').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

var tileParam = {top:"road", righ:"land", bottom:"castle", left:"castle"};

// set tile
$('#clicker').click(function() {
  socket.emit('set tile', tileParam);
});

//send message
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('set tile', function(tileParams){
  console.log(tileParams);
});