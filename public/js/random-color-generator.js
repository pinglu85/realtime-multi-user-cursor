let userIconsArray = [].slice.call(document.querySelectorAll('.user-icon'));
let cursorIconsArray = [].slice.call(document.querySelectorAll('.cursor-icon'));

userIconsArray.forEach(userIcon => {
  userIcon.style.background = `rgb(${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
});

cursorIconsArray.forEach(cursorIcon => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  cursorIcon.style.stroke = `rgb(${r}, ${g}, ${b})`;
  cursorIcon.nextElementSibling.style.background = `rgba(${r}, ${g}, ${b}, 0.7)`;
});
