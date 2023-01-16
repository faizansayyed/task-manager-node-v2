const httpStatus = require("http-status");
const { userService } = require("../services");
const pick = require("../utils/pick");
const config = require("../config/config");
const { uuid } = require("uuidv4");
const { fileUploadService } = require("../services");
const axios = require("axios");

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

const uploadUserProfile = async (req, res) => {
  const imageName = `users/${req.user.id}/${uuid()}.jpeg`;
  const bucketName = config.awsBucketName;
  const file = req.file;
  const signedUrl = await fileUploadService.getSignedUrlService(imageName, bucketName, file);
  res.status(200).send({ message: "Link Generated!", data: signedUrl, imageName });
};

const dummyFileUpload = async (req, res) => {
  const file = req.file;
  const fileName = req.body.fileName;

  await axios.put(req.body.uploadUrl, req.file.buffer, {
    "Content-Type": file.mimetype,
  });

  await userService.updateUserById(req.user.id, { profileImage: fileName });

  res.status(200).send({ message: "File Uploaded Successfully!" });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadUserProfile,
  dummyFileUpload,
};
