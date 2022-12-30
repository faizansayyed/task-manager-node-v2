const express = require("express");
const { authController } = require("../../controllers");
const validateRequest = require("../../middlewares/validateRequest");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/register",
  validateRequest(),
  catchAsync(authController.register)
);

router.post("/login", validateRequest(), catchAsync(authController.login));
router.post(
  "/logout",
  auth,
  validateRequest(),
  catchAsync(authController.logout)
);

router.post("/refresh-tokens", validateRequest(), authController.refreshTokens);

module.exports = router;
