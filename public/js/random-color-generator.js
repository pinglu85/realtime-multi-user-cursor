let userIconsArray = [].slice.call(document.querySelectorAll('.user-icon'));

userIconsArray.forEach(userIcon => {
  userIcon.style.background = `rgb(${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
});
