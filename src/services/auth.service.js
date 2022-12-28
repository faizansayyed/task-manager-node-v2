const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const userService = require("./user.service");

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
const logout = async () => {};

module.exports = {
  loginUserWithEmailAndPassword,
};
