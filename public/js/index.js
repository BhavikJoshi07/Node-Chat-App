var socket = io();
socket.on('connect' , function () {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    console.log('New Message Received' , message);
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});