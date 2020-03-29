const displayCursorContainer = document.querySelector('.cursor-container');
const userList = document.querySelector('.users');

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// User joins
socket.emit('join', { username });

// Listen for mouse position
displayCursorContainer.addEventListener('pointermove', e => {
  const mousePos = {
    x: e.pageX,
    y: e.pageY
  };

  // Emit mouse position to server
  socket.emit('mousePos', mousePos);
});

// Get joined users
socket.on('joinedUsers', ({ users }) => {
  users.forEach(user => {
    displayCursor(user.username, user.id);
    outputUsername(user.username);
  });
});

// Get new user
socket.on('newUser', user => {
  displayCursor(user.username, user.id);
  outputUsername(user.username);
});

// Mouse position from server
socket.on('mousePos', ({ mousePos, id }) => {
  console.log(mousePos, id);
  updateCursorPos(mousePos, id);
});

// User leave
socket.on('userLeave', ({ username, id }) => {
  console.log(id);
  document.getElementById(id).remove();
  document.getElementById(username).remove();
  if (userList.children) {
    userList.style.display = 'none';
  }
});

// Display cursor
function displayCursor(username, id) {
  const [r, g, b] = randomColor();

  const div = document.createElement('div');
  div.id = id;
  div.classList.add('cursor');
  div.innerHTML = `<svg class="cursor-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 13.6 17.3" xml:space="preserve">
  <path d="M3.1 6.2c.4-.2 1.4 0 1.6.5.2.5.4 1.2.4 1.1 0-.4 0-6.2.1-6.6.2-.3.4-.6.8-.7.3-.1.6-.1.9-.1.3.1.6.3.8.5.3.7.3 6.9.3 6.9.1-.3.1-1.2.3-1.6.2-.2.5-.5.7-.5.3-.1.7-.1 1 0 .2 0 .6.3.7.5.2.3.3 1.3.3 1.6 0 .1.1-.4.3-.7.4-.6 1.8-.8 1.9.6V10c0 .4-.1 1.3-.2 1.7-.1.3-.4 1-.7 1.4 0 0-1.1 1.2-1.2 1.8s-.1.6-.1 1 .1.9.1.9-.8.1-1.2 0c-.4-.1-.9-.8-1-1.1-.2-.3-.5-.3-.7 0-.2.4-.7 1.1-1.1 1.1-.7.1-2.1 0-3.1 0 0 0 .2-1-.2-1.4l-1.1-1.1-.8-.9c-.3-.4-1-.9-1.2-2-.2-.9-.2-1.4 0-1.8.2-.4.7-.6.9-.6.2 0 .7 0 .9.1.2.1.3.2.5.4.1.4.1.6 0 .3 0-.3-.3-.6-.4-1-.1-.4-.4-1-.4-1.5 0-.3.1-.8.9-1.1" fill="#fff"/>
  <path d="M3.1 6.2c.4-.2 1.4 0 1.6.5.2.5.4 1.2.4 1.1 0-.4 0-6.2.1-6.6.2-.3.4-.6.8-.7.3-.1.6-.1.9-.1.3.1.6.3.8.5.3.7.3 6.9.3 6.9.1-.3.1-1.2.3-1.6.2-.2.5-.5.7-.5.3-.1.7-.1 1 0 .2 0 .6.3.7.5.2.3.3 1.3.3 1.6 0 .1.1-.4.3-.7.4-.6 1.8-.8 1.9.6V10c0 .4-.1 1.3-.2 1.7-.1.3-.4 1-.7 1.4 0 0-1.1 1.2-1.2 1.8s-.1.6-.1 1 .1.9.1.9-.8.1-1.2 0c-.4-.1-.9-.8-1-1.1-.2-.3-.5-.3-.7 0-.2.4-.7 1.1-1.1 1.1-.7.1-2.1 0-3.1 0 0 0 .2-1-.2-1.4l-1.1-1.1-.8-.9c-.3-.4-1-.9-1.2-2-.2-.9-.2-1.4 0-1.8.2-.4.7-.6.9-.6.2 0 .7 0 .9.1.2.1.3.2.5.4.1.4.1.6 0 .3 0-.3-.3-.6-.4-1-.1-.4-.4-1-.4-1.5 0-.3.1-.8.9-1.1z" fill="none" stroke-width=".75" stroke-linejoin="round"/>
  <path fill="none" stroke-width=".75" stroke-linejoin="round" d="M10.1 13.9v-3.4M8 13.9v-3.4M6 10.5l.1 3.4"/>
</svg>
        <div class="username">${username}</div>`;
  div.children[0].style.stroke = `rgba(${r}, ${g}, ${b})`;
  div.children[1].style.background = `rgba(${r}, ${g}, ${b}, 0.7)`;
  displayCursorContainer.appendChild(div);
}

// Update cursor position
function updateCursorPos(pos, id) {
  const div = document.getElementById(id);
  if (div) {
    div.style.left = `${pos.x + 16}px`;
    div.style.top = `${pos.y + 16}px`;
  }
}

// Output usernames
function outputUsername(username) {
  const [r, g, b] = randomColor();
  const li = document.createElement('li');
  li.id = username;
  li.classList.add('user-icon');
  li.style.background = `rgba(${r}, ${g}, ${b})`;
  li.innerText = username[0];
  userList.appendChild(li);
  userList.style.display = 'flex';
}

// Generate random color
function randomColor() {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ];
}
