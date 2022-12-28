const httpStatus = require("http-status");
const { authService, tokenService, userService } = require("../services");

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthToken(user);
  res.status(200).send({ user, tokens });
};

const login = async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password
  );

  const tokens = await tokenService.generateAuthToken(user);
  res.status(200).send({ user, tokens });
};

const logout = async (req, res) => {
  console.log("logout");
};

module.exports = {
  register,
  login,
  logout,
};
