const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname , '../public');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage' , {
        from : 'bhavikJ',
        text : 'This is just a Message from BhavikJ',
        createdAt : 1211112112
    });

    socket.on('createMessage', (message) => {
        console.log('Create Message ' , message);
    });

    socket.on('disconnect' , () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});