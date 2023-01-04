const jwt = require("jsonwebtoken");
const { Token } = require("../models");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { tokenTypes } = require("../config/tokens");
const { roleRights } = require("../config/roles");

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const payload = jwt.verify(token, config.jwt.secret);

      const tokenDoc = await Token.findOne({
        token,
        type: tokenTypes.REFRESH,
        userId: payload.sub,
        blacklisted: false,
      }).populate("userId");

      if (!tokenDoc) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
      }
      req.token = tokenDoc.token;
      const user = tokenDoc.userId;
      req.user = user;
      if (requiredRights.length) {
        const userRights = roleRights.get(user.role);

        const hasRequiredRights = requiredRights.every((requiredRight) =>
          userRights.includes(requiredRight)
        );

        if (!hasRequiredRights && req.params.userId !== user.id) {
          return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
        }
      }
      next();
    } catch (error) {
      console.log({ error });
      next(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!"));
    }
  };

module.exports = auth;
