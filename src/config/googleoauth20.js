const { Strategy } = require("passport-google-oauth20");
const config = require("./config");
const { User } = require("../models");

async function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("===verifyCallback=====");
  let user = await User.findOne({ googleId: profile.id });
  console.log({ user });
  const profileJson = profile._json;
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profileJson.email,
      name: profileJson.name,
      isEmailVerified: true,
      isSocialLogin: true,
    });
  }
  console.log({ user });
  return done(null, user);
}

const googleOAuthStrategy = new Strategy(config.googleOauth20Options, verifyCallback);

module.exports = {
  googleOAuthStrategy,
};
