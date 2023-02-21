import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "../services";
import pick from "../utils/pick";
import config from "../config/config";
import { uuid } from "uuidv4";
import { fileUploadService } from "../services";
import axios from "axios";

interface File {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
  buffer: Buffer;
  mimetype: string;
}

interface FileRequest extends Request {
  file: File;
}

const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(200).send({ message: "User Created!", user });
};

const getUsers = async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const users = await userService.queryUsers(filter, options);

  res.status(200).send({ message: "Users", users });
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);

  res.status(200).send({ message: "User", user });
};

const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUserById(req.params.userId, req.body);

  res.status(200).send({ message: "User Updated!", user });
};

const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.userId);

  res.status(httpStatus.NO_CONTENT).send({ message: "User Deleted!" });
};

const uploadUserProfile = async (req: FileRequest, res: Response) => {
  const imageName = `users/${req.user.id}/${uuid()}.jpeg`;
  const bucketName = config.awsBucketName;
  const file = req.file;
  const signedUrl = await fileUploadService.getSignedUrlService(imageName, bucketName, file);
  res.status(200).send({ message: "Link Generated!", data: signedUrl, imageName });
};

const dummyFileUpload = async (req: FileRequest, res: Response) => {
  const file = req.file;
  const fileName = req.body.fileName;
  await axios.put(req.body.uploadUrl, file.buffer, {
    headers: {
      "Content-Type": file.mimetype,
    },
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
