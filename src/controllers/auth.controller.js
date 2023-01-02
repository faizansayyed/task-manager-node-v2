const httpStatus = require("http-status");
const {
  authService,
  tokenService,
  userService,
  emailService,
} = require("../services");

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(200).send({ message: "User Registered", user, tokens });
};

const login = async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password
  );

  const tokens = await tokenService.generateAuthTokens(user);
  res.status(200).send({ message: "Logged In successfully!", user, tokens });
};

const logout = async (req, res) => {
  await authService.logout(req.token);
  res.status(200).send({ message: "Logged Out successfully!" });
};

const refreshTokens = async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.status(200).send({ message: "Refresh Token", tokens });
};

const forgotPassword = async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

  res.status(200).send({ message: "Link Generated, please check your email!" });
};

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);

  res.status(200).send({ message: "Password Updated Successfully!" });
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
