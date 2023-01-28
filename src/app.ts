import express from "express";
import cors from "cors";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import httpStatus from "http-status";

import api from "./routes/v1";
import morgan from "./config/morgan";
import config from "./config/config";
import ApiError from "./utils/ApiError";
import { errorConverter, errorHandler } from "./middlewares/error";
import { authLimiter } from "./middlewares/rateLimiter";

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

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
