const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createTask = {
  body: Joi.object().keys({
    description: Joi.string().required(),
    completed: Joi.boolean().required(),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      description: Joi.string(),
      completed: Joi.boolean(),
    })
    .min(1),
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const getTaskByDate = {
  body: Joi.object().keys({
    from: Joi.date().required().greater("1-1-1974"),
    to: Joi.date().greater(Joi.ref("from")).required(),
  }),
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskByDate,
};
