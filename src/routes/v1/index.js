const express = require("express");
const userRouter = require("./user.router");
const taskRouter = require("./task.router");
const authRouter = require("./auth.router");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
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
