/*
The basic chat app that I, Brayden, have managed to get working on my local machine.
It may not work here yet but this is the layout of how it worked.

This file is making use of the already instantiated package.json file here. 
First thing I did was npm install express@4 and socket.io in the package
*/

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chatAppTest.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});