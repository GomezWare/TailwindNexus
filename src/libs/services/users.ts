// TODO Document this service when its finally complete

import users from "@data/users.json";

const getUsers = () => {
  return users;
};

const getUser = (id) => {
  const user = users.find((user) => user.id == id);
  return user;
};

export { getUsers, getUser };
