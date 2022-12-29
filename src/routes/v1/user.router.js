const express = require("express");
const { userController } = require("../../controllers");
const validateRequest = require("../../middlewares/validateRequest");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(auth, validateRequest(), catchAsync(userController.createUser))
  .get(auth, validateRequest(), catchAsync(userController.getAllUsers));

router
  .route("/:userId")
  .get(auth, validateRequest(), catchAsync(userController.getUser))
  .patch(auth, validateRequest(), catchAsync(userController.updateUser))
  .delete(auth, validateRequest(), catchAsync(userController.deleteUser));

module.exports = router;
