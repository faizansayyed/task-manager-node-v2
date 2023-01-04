const httpStatus = require("http-status");
const { userService } = require("../services");
const pick = require("../utils/pick");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(200).send({ message: "User Created!", user });
};

const getUsers = async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const users = await userService.queryUsers(filter, options);

  res.status(200).send({ message: "Users", users });
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);

  res.status(200).send({ message: "User", user });
};

const updateUser = async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);

  res.status(200).send({ message: "User Updated!", user });
};

const deleteUser = async (req, res) => {
  await userService.deleteUserById(req.params.userId);

  res.status(httpStatus.NO_CONTENT).send({ message: "User Deleted!" });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
