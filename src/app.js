const express = require("express");
const cors = require("cors");
const path = require("path");

const api = require("./routes/v1");
const morgan = require("./config/morgan");
const config = require("./config/config");
const compression = require("compression");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const helmet = require("helmet");

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

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
