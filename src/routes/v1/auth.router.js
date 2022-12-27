const express = require("express");
const { authController } = require("../../controllers");
const validateRequest = require("../../middlewares/validateRequest");
const catchAsync = require("../../utils/catchAsync");

const router = express.Router();

router.post(
  "/register",
  validateRequest(),
  catchAsync(authController.register)
);

router.post("/login", validateRequest(), catchAsync(authController.login));
router.post("/logout", validateRequest(), catchAsync(authController.logout));

module.exports = router;
