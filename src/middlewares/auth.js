const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { Token } = require("../models");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/tokens");
const { roleRights } = require("../config/roles");

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
      }

      const user = req.user;

      if (requiredRights.length) {
        const userRights = roleRights.get(user.role);

        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));

        console.log("requiredRight === ", requiredRights);
        console.log("userRights === ", userRights);
        if (!hasRequiredRights) {
          return next(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
        }
      }

      next();
    } catch (error) {
      console.log({ error });
      next(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!"));
    }
  };

module.exports = auth;
