const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const userService = require("./user.service");
const { Token } = require("../models");
const { tokenTypes } = require("../config/tokens");
const { tokenService } = require(".");

/**
 * Login user with emil and password
 * @param {ObjectId} email
 * @param {ObjectId} password
 * @returns {Promise<Token>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

/**
 * Logout user
 * @returns {}
 */
const logout = async (token) => {
  const tokenDoc = await tokenService.verifyToken(token, tokenTypes.REFRESH);

  await tokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};
