const express = require("express");
const { taskController } = require("../../controllers");
const validateRequest = require("../../middlewares/validateRequest");
const catchAsync = require("../../utils/catchAsync");

const router = express.Router();

router
  .route("/")
  .post(
    // auth("manageUsers"),
    validateRequest(),
    catchAsync(taskController.createTask)
  )
  .get(
    // auth("getUsers"),
    validateRequest(),
    catchAsync(taskController.getAllTasks)
  );

router
  .route("/:taskId")
  .get(
    // auth("getUsers"),
    validateRequest(),
    catchAsync(taskController.getTask)
  )
  .patch(
    // auth("manageUsers"),
    validateRequest(),
    catchAsync(taskController.updateTask)
  )
  .delete(
    // auth("manageUsers"),
    validateRequest(),
    catchAsync(taskController.deleteTask)
  );

module.exports = router;
