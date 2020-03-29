const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { userJoin, getUsers, userLeave } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
  socket.on('join', ({ username }) => {
    const user = userJoin(username, socket.id);

    console.log(user);
    console.log(getUsers(socket.id));
    socket.broadcast.emit('newUser', user);
    socket.emit('joinedUsers', { users: getUsers(socket.id) });
  });

  // Listen for mouse position
  socket.on('mousePos', pos => {
    // Broadcast client's mouse position
    socket.broadcast.emit('mousePos', { mousePos: pos, id: socket.id });
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.emit('userLeave', { username: user.username, id: user.id });
    }
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
