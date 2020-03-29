const users = [];

// User joins
function userJoin(username, id) {
  const user = { username, id };
  users.push(user);

  return user;
}

// Get users except sender
function getUsers(id) {
  return users.filter(user => user.id !== id);
}

// User leaves
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  userJoin,
  getUsers,
  userLeave
};
