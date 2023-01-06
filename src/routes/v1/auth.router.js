const express = require("express");
const { authController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");
const { authValidation } = require("../../validations");

console.log("new change");

const router = express.Router();

router.post("/register", validate(authValidation.register), catchAsync(authController.register));

router.post("/login", validate(authValidation.login), catchAsync(authController.login));
router.post("/logout", validate(authValidation.logout), catchAsync(authController.logout));

router.post("/refresh-tokens", validate(authValidation.refreshTokens), catchAsync(authController.refreshTokens));
router.post("/forgot-password", validate(authValidation.forgotPassword), catchAsync(authController.forgotPassword));

router.post("/reset-password", validate(authValidation.resetPassword), catchAsync(authController.resetPassword));

router.post("/send-verification-email", auth("verifyEmail"), validate(), authController.sendVerificationEmail);

router.post("/verify-email", validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;
