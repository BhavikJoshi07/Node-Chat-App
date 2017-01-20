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

$('#locationButton').on('click', function() {
    if(!navigator.geolocation) {
        return alert('GeoLocation not supported by the browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function(e) {
        alert('Unable to fetch the position');
    });
});

socket.on('newLocationMessage', function(message) {
    $('#messages').append(`<li>${message.from} : <a target = "_blank" href="${message.url}">My Current Location</a></li>`);
});