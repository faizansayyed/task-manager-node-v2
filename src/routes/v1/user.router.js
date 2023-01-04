const express = require("express");
const { userController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");
const { userValidation } = require("../../validations");

const router = express.Router();

router
  .route("/")
  .post(
    auth("manageUsers"),
    validate(userValidation.createUser),
    catchAsync(userController.createUser)
  )
  .get(
    auth("getUsers"),
    validate(userValidation.getUsers),
    catchAsync(userController.getUsers)
  );

router
  .route("/:userId")
  .get(
    auth("getUsers"),
    validate(userValidation.getUser),
    catchAsync(userController.getUser)
  )
  .patch(
    auth("manageUsers"),
    validate(userValidation.updateUser),
    catchAsync(userController.updateUser)
  )
  .delete(
    auth("manageUsers"),
    validate(userValidation.deleteUser),
    catchAsync(userController.deleteUser)
  );

module.exports = router;
