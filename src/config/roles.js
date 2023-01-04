const allRoles = {
  user: ["manageTask", "getTask", "verifyEmail"],
  admin: [
    "getUsers",
    "manageUsers",
    "getTasks",
    "getTask",
    "manageTask",
    "verifyEmail",
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
