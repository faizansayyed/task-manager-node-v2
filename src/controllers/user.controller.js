const httpStatus = require("http-status");
const { userService } = require("../services");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(200).send(user);
};

const getAllUsers = async (req, res) => {
  const users = await userService.queryUsers();

  res.status(200).send(users);
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);

  res.status(200).send(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);

  res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUserById(req.params.userId);

  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
