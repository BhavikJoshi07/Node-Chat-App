const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validate');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname , '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    // console.log('New User Connected');

    socket.on('createMessage', (message,callback) => {
        console.log('Create Message ' , message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('join' , (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Display Name and Room Name are Required');
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);

      io.to(params.room).emit('updateUserList',users.userList(params.room));

      socket.emit('newMessage',generateMessage('Admin', 'Welcome to the Chat App'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined the Chat`));

      callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect' , () => {
        var user = users.removeUser(socket.id);
        if(user) {
          io.to(user.room).emit('updateUserList',users.userList(user.room));
          io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
