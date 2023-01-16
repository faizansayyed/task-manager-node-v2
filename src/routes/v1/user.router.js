const express = require("express");
const multer = require("multer");

const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const { userController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");
const { userValidation } = require("../../validations");
const ApiError = require("../../utils/ApiError");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ApiError("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router
  .route("/")
  .post(auth("manageUsers"), validate(userValidation.createUser), catchAsync(userController.createUser))
  .get(auth("getUsers"), validate(userValidation.getUsers), catchAsync(userController.getUsers));

router
  .route("/:userId")
  .get(auth("getUsers"), validate(userValidation.getUser), catchAsync(userController.getUser))
  .patch(auth("manageUsers"), validate(userValidation.updateUser), catchAsync(userController.updateUser))
  .delete(auth("manageUsers"), validate(userValidation.deleteUser), catchAsync(userController.deleteUser));

router
  .route("/upload")
  .post(
    auth("manageUsers"),
    upload.single("image"),
    validate(userValidation.uploadUserProfile),
    catchAsync(userController.uploadUserProfile)
  );

router.route("/dummy/upload").post(auth("manageUsers"), upload.single("image"), catchAsync(userController.dummyFileUpload));

module.exports = router;
