const express = require("express");
const { userController } = require("../../controllers");
const validateRequest = require("../../middlewares/validateRequest");
const catchAsync = require("../../utils/catchAsync");

const router = express.Router();

router
  .route("/")
  .post(
    // auth("manageUsers"),
    validateRequest(),
    catchAsync(userController.createUser)
  )
  .get(
    // auth("getUsers"),
    validateRequest(),
    catchAsync(userController.getUsers)
  );

router
  .route("/:userId")
  .get(
    // auth("getUsers"),
    validateRequest(),
    catchAsync(userController.getUser)
  )
  .patch(
    // auth("manageUsers"),
    validateRequest(),
    catchAsync(userController.updateUser)
  )
  .delete(
    // auth("manageUsers"),
    validateRequest(),
    catchAsync(userController.deleteUser)
  );

module.exports = router;
