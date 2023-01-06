const { taskService } = require("../services");

const createTask = async (req, res) => {
  const userObj = { ...req.body, userId: req.user.id };
  const task = await taskService.createTask(userObj);
  res.status(200).send({ message: "Task Created!", task });
};

const getAllTasks = async (req, res) => {
  const tasks = await taskService.queryTasks();
  res.status(200).send({ message: "Tasks", tasks });
};

const getTask = async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);
  res.status(200).send({ message: "Task", task });
};

const updateTask = async (req, res) => {
  const userObj = { ...req.body, userId: req.user._id };
  const task = await taskService.updateTaskById(req.params.taskId, userObj);
  res.status(200).send({ message: "Task Updated!", task });
};

const deleteTask = async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(200).send({ message: "Task Deleted!" });
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
