const express = require("express");
const { taskController } = require("../../controllers");
const validateRequest = require("../../middlewares/validateRequest");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(auth, validateRequest(), catchAsync(taskController.createTask))
  .get(auth, validateRequest(), catchAsync(taskController.getAllTasks));

router
  .route("/:taskId")
  .get(auth, validateRequest(), catchAsync(taskController.getTask))
  .patch(auth, validateRequest(), catchAsync(taskController.updateTask))
  .delete(auth, validateRequest(), catchAsync(taskController.deleteTask));

module.exports = router;
