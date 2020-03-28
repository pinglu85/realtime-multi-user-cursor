const displayCursorContainer = document.querySelector('.cursor-container');
let div;

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// User joins
socket.emit('join', { username });

// Get users
socket.on('joinedUser', username => {
  displayCursor(username);
});

// Listen for mouse position
displayCursorContainer.addEventListener('pointermove', e => {
  const mousePos = {
    x: e.pageX,
    y: e.pageY
  };

  // Emit mouse position to server
  socket.emit('mousePos', mousePos);
});

// Display cursor
function displayCursor(username) {
  const [r, g, b] = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ];

  div = document.createElement('div');
  div.classList.add('cursor');
  div.innerHTML = `<svg
          class="cursor-icon"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 32 32"
          xml:space="preserve"
        >
          <path
            d="M11.9 13.3c.5-.2 1.4-.1 1.7.5.2.5.4 1.2.4 1.1 0-.4 0-6.2.1-6.6.1-.3.3-.6.7-.7.3-.1.6-.1.9-.1.3.1.6.3.7.5.4.6.4 6.9.4 6.8.1-.3.1-1.2.3-1.6.1-.2.5-.4.7-.5.3-.1.7-.1 1 0 .2 0 .6.3.7.5.2.3.3 1.3.4 1.7 0 .1.1-.4.3-.7.4-.6 1.8-.8 1.9.6v2.3c0 .4-.1 1.3-.2 1.7-.1.3-.4 1-.7 1.4 0 0-1.1 1.2-1.2 1.8s-.1.6-.1 1 .1.9.1.9-.8.1-1.2 0c-.4-.1-.9-.8-1-1.1-.2-.3-.5-.3-.7 0-.2.4-.7 1.1-1.1 1.1-.7.1-2.1 0-3.1 0 0 0 .2-1-.2-1.4l-1.1-1.1-.8-.9c-.3-.4-1-.9-1.2-2-.2-.9-.2-1.4 0-1.8.2-.4.7-.6.9-.6.2 0 .7 0 .9.1.2.1.3.2.5.4.2.3.3.5.2.1-.1-.3-.3-.6-.4-1-.1-.4-.4-.9-.4-1.5-.3-.1-.2-.6.6-.9"
            fill="#fff"
            stroke-miterlimit="10"
          />
          <path
            d="M11.9 13.3c.5-.2 1.4-.1 1.7.5.2.5.4 1.2.4 1.1 0-.4 0-6.2.1-6.6.1-.3.3-.6.7-.7.3-.1.6-.1.9-.1.3.1.6.3.7.5.4.6.4 6.9.4 6.8.1-.3.1-1.2.3-1.6.1-.2.5-.4.7-.5.3-.1.7-.1 1 0 .2 0 .6.3.7.5.2.3.3 1.3.4 1.7 0 .1.1-.4.3-.7.4-.6 1.8-.8 1.9.6v2.3c0 .4-.1 1.3-.2 1.7-.1.3-.4 1-.7 1.4 0 0-1.1 1.2-1.2 1.8s-.1.6-.1 1 .1.9.1.9-.8.1-1.2 0c-.4-.1-.9-.8-1-1.1-.2-.3-.5-.3-.7 0-.2.4-.7 1.1-1.1 1.1-.7.1-2.1 0-3.1 0 0 0 .2-1-.2-1.4l-1.1-1.1-.8-.9c-.3-.4-1-.9-1.2-2-.2-.9-.2-1.4 0-1.8.2-.4.7-.6.9-.6.2 0 .7 0 .9.1.2.1.3.2.5.4.2.3.3.5.2.1-.1-.3-.3-.6-.4-1-.1-.4-.4-.9-.4-1.5-.3-.1-.2-.6.6-.9z"
            fill="none"
            stroke-width=".75"
            stroke-linejoin="round"
          />
          <path
            fill="none"
            stroke-width=".75"
            stroke-linejoin="round"
            d="M18.9 21v-3.5M16.8 21v-3.5M14.8 17.6l.1 3.4"
          />
        </svg>
        <div class="username">${username}</div>`;
  div.children[0].style.stroke = `rgba(${r}, ${g}, ${b})`;
  div.children[1].style.background = `rgba(${r}, ${g}, ${b}, 0.7)`;
  displayCursorContainer.appendChild(div);
}

function updateCursorPos(pos) {
  console.log(div);
  if (div) {
    div.style.left = `${pos.x + 16}px`;
    div.style.top = `${pos.y + 16}px`;
  }
}
