const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { validationResult } = require("express-validator");

const validate = (schema) => (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");

    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  return next();
};

module.exports = validate;
