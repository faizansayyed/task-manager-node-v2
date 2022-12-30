const httpStatus = require("http-status");
const { userService } = require("../services");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(200).send({ message: "User Created!", user });
};

const getAllUsers = async (req, res) => {
  const users = await userService.queryUsers();

  res.status(200).send({ message: "Users", users });
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
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
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
