const express = require("express");
const { taskController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");
const { taskValidation } = require("../../validations");
// const cleanCache = require("../../middlewares/cleanCache");

const router = express.Router();

router
  .route("/")
  .post(auth("manageTask"), validate(taskValidation.createTask), /* cleanCache,*/ catchAsync(taskController.createTask))
  .get(auth("getTasks"), validate(taskValidation.getTasks), catchAsync(taskController.getAllTasks));

router
  .route("/:taskId")
  .get(auth("getTask"), validate(taskValidation.getTask), catchAsync(taskController.getTask))
  .patch(auth("manageTask"), validate(taskValidation.updateTask), /* cleanCache,*/ catchAsync(taskController.updateTask))
  .delete(auth("manageTask"), validate(taskValidation.deleteTask), /* cleanCache,*/ catchAsync(taskController.deleteTask));

module.exports = router;
