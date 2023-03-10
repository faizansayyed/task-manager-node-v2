const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVars = process.env;

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  redisUrl: envVars.REDIS_URL,
  awsS3Region: envVars.AWS_S3_REGION,
  awsS3AccessKeyId: envVars.AWS_S3_ACCESS_KEY,
  awsS3SecretKey: envVars.AWS_S3_SECRET_KEY,
  awsBucketName: envVars.AWS_BUCKET_NAME,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
    sendGridApiKey: envVars.SENDGRID_API_KEY,
  },
};
