const { clearHash } = require("../services/cache.service");

module.exports = async (req, res, next) => {
  await next();

  clearHash(req.user.id);
};
