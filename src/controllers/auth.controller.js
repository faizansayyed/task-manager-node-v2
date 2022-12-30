const httpStatus = require("http-status");
const { authService, tokenService, userService } = require("../services");

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthToken(user);
  res.status(200).send({ message: "User Registered", user, tokens });
};

const login = async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password
  );

  const tokens = await tokenService.generateAuthToken(user);
  res.status(200).send({ message: "Logged In successfully!", user, tokens });
};

const logout = async (req, res) => {
  await authService.logout(req.user, req.token);
  res.status(200).send({ message: "Logged Out successfully!" });
};

module.exports = {
  register,
  login,
  logout,
};
