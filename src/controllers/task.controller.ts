import { Request, Response } from "express";
import { taskService } from "../services";

const createTask = async (req: Request, res: Response) => {
  const userObj = { ...req.body, userId: req.user.id };
  const task = await taskService.createTask(userObj);
  res.status(200).send({ message: "Task Created!", task });
};

const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.queryTasks(req.user.id);
  res.status(200).send({ message: "Tasks", tasks });
};

const getTask = async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(req.params.taskId);
  res.status(200).send({ message: "Task", task });
};

const updateTask = async (req: Request, res: Response) => {
  const userObj = { ...req.body, userId: req.user.id };
  const task = await taskService.updateTaskById(req.params.taskId, userObj);
  res.status(200).send({ message: "Task Updated!", task });
};

const deleteTask = async (req: Request, res: Response) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(200).send({ message: "Task Deleted!" });
};

const getTaskByDate = async (req: Request, res: Response) => {
  const tasks = await taskService.getTaskByDate(req.body);
  res.status(200).send({ message: "Tasks", tasks });
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskByDate,
};
