const express = require("express");
const passport = require("passport");

const { authController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const catchAsync = require("../../utils/catchAsync");
const auth = require("../../middlewares/auth");
const { authValidation } = require("../../validations");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    approvalPrompt: "force",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
  }), // complete the authenticate using the google strategy
  (err, req, res, next) => {
    // custom error handler to catch any errors, such as TokenError
    if (err.name === "TokenError") {
      console.log({ err });
      res.redirect("/"); // redirect them back to the login page
    } else {
      console.log({ err });
      // Handle other errors here
    }
  },
  (req, res) => {
    // On success, redirect back to '/'
    res.redirect("/");
  }
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/failure",
//     successRedirect: "/",
//     session: false,
//   }),
//   (req, res) => {
//     console.log("Google called us back!");
//   }
// );

router.get("/logout", (req, res) => {
  req.logout(); //Removes req.user and clears any logged in session
  return res.redirect("/");
});

router.post("/register", validate(authValidation.register), catchAsync(authController.register));

router.post("/login", validate(authValidation.login), catchAsync(authController.login));
router.post("/logout", validate(authValidation.logout), catchAsync(authController.logout));

router.post("/refresh-tokens", validate(authValidation.refreshTokens), catchAsync(authController.refreshTokens));
router.post("/forgot-password", validate(authValidation.forgotPassword), catchAsync(authController.forgotPassword));

router.post("/reset-password", validate(authValidation.resetPassword), catchAsync(authController.resetPassword));

router.post("/send-verification-email", auth("verifyEmail"), validate(), authController.sendVerificationEmail);

router.post("/verify-email", validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;
