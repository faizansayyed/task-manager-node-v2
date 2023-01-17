const express = require("express");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const httpStatus = require("http-status");
const passport = require("passport");
const cookieSession = require("cookie-session");

const api = require("./routes/v1");
const morgan = require("./config/morgan");
const config = require("./config/config");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { authLimiter } = require("./middlewares/rateLimiter");
const regenerateMiddleware = require("./middlewares/regenerate");
const { googleOAuthStrategy } = require("./config/googleoauth20");
const auth = require("./middlewares/auth");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(cors());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.cookieKey1, config.cookieKey2],
  })
);

// register regenerate & save after the cookieSession middleware initialization
// we need to add this when using passort 0.6 with cookie session 2.0
app.use(regenerateMiddleware);

// jwt authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(googleOAuthStrategy);

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((user, done) => {
  done(null, user);
});

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "public")));

// // jwt authentication
// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);

// // limit repeated failed requests to auth endpoints
// if (config.env === "production") {
//   app.use("/v1/auth", authLimiter);
// }

app.use("/v1", api);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", auth("getTask"), (req, res) => {
  if (req.isAuthenticated()) {
    return res.send("Logged In" + JSON.stringify(req.user));
  } else {
    res.redirect("/");
  }
});

app.get("/failure", (req, res) => {
  return res.send("Failed to log in!");
});
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
