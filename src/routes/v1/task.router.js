const express = require("express");
const { taskController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");
const { taskValidation } = require("../../validations");

const router = express.Router();

router
  .route("/")
  .post(
    auth,
    validate(taskValidation.createTask),
    catchAsync(taskController.createTask)
  )
  .get(
    auth,
    validate(taskValidation.getTasks),
    catchAsync(taskController.getAllTasks)
  );

router
  .route("/:taskId")
  .get(
    auth,
    validate(taskValidation.getTask),
    catchAsync(taskController.getTask)
  )
  .patch(
    auth,
    validate(taskValidation.updateTask),
    catchAsync(taskController.updateTask)
  )
  .delete(
    auth,
    validate(taskValidation.deleteTask),
    catchAsync(taskController.deleteTask)
  );

module.exports = router;
