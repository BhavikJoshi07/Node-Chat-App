var socket = io();
socket.on('connect' , function () {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm:a');
    var template = $('#messageTemplate').html();
    var text = Mustache.render(template, {
        from : message.from,
        createdAt : formattedTime,
        body : message.text
    });
    $('#messages').append(text);
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageBox = $('[name = messageText]');
    socket.emit('createMessage', {
        from : 'User',
        text : messageBox.val()
    }, function () {
        messageBox.val('')
    });
});

var locationButton = $('#locationButton');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('GeoLocation not supported by the browser.');
    }

    locationButton.attr('disabled','disabled').text('Sending Location ..')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function(e) {
        alert('Unable to fetch the position');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm:a');
    // $('#messages').append(`<li>${message.from} ${formattedTime} : <a target = "_blank" href="${message.url}">My Current Location</a></li>`);

    var template = $('#locationMessageTemplate').html();
    var text = Mustache.render(template, {
        from : message.from,
        createdAt : formattedTime,
        url : message.url
    });
    $('#messages').append(text);
});