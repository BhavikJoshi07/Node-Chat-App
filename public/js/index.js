var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = $('#messages');
    var newMessage = $('#messages').children('li:last-child');

    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

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
    scrollToBottom();
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
    var template = $('#locationMessageTemplate').html();
    var text = Mustache.render(template, {
        from : message.from,
        createdAt : formattedTime,
        url : message.url
    });
    $('#messages').append(text);
    scrollToBottom();
});