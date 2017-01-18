var socket = io();
socket.on('connect' , function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from : 'SmitK',
        text : 'Just a message from Smit'
    });

});

socket.on('newMessage', function(message) {
    console.log('New Message Received' , message);
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});