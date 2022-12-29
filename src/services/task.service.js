const httpStatus = require("http-status");
const { Task } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a task
 * @param {Object} userBody
 * @returns {Promise<Task>}
 */
const createTask = async (userBody) => {
  return Task.create(userBody);
};

/**
 * Query for tasks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTasks = async () => {
  const tasks = await Task.find({}).populate("userId");\
  return tasks;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  return await Task.findById(id);
};

/**
 * Update task by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (userId, updateBody) => {
  const task = await getTaskById(userId);

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found!");
  }

  Object.assign(task, updateBody);
  await task.save();
  return task;
};

/**
 * Delete task by id
 * @param {ObjectId} userId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (userId) => {
  const task = await getTaskById(userId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found!");
  }
  await task.remove();
  return task;
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
