const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { userJoin, getCurrentUser, userLeave } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
  socket.on('join', ({ username }) => {
    const user = userJoin(username, socket.id);

    socket.broadcast.emit('joinedUser', user.username);
  });

  // Listen for mouse position
  socket.on('mousePos', pos => {
    // Broadcast client's mouse position
    socket.broadcast.emit('mousePos', pos);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
