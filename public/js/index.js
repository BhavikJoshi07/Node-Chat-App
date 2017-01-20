var socket = io();
socket.on('connect' , function () {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    console.log('New Message Received' , message);
    $('#messages').append(`<li>${message.from} : ${message.text}</li>`);
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from : 'User',
        text : $('[name = messageText]').val()
    }, function() {

    });
});