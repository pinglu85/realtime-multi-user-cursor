const users = [];

// User joins
function userJoin(username, id) {
  const user = { username, id };
  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(id => user.id === id);
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
  getCurrentUser,
  userLeave
};
