const express = require("express");
const userRouter = require("./user.router");
const taskRouter = require("./task.router");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/task",
    route: taskRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
