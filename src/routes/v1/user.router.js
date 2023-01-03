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
    auth,
    validate(userValidation.createUser),
    catchAsync(userController.createUser)
  )
  .get(
    auth,
    validate(userValidation.getUsers),
    catchAsync(userController.getUsers)
  );

router
  .route("/:userId")
  .get(
    auth,
    validate(userValidation.getUser),
    catchAsync(userController.getUser)
  )
  .patch(
    auth,
    validate(userValidation.updateUser),
    catchAsync(userController.updateUser)
  )
  .delete(
    auth,
    validate(userValidation.deleteUser),
    catchAsync(userController.deleteUser)
  );

module.exports = router;
