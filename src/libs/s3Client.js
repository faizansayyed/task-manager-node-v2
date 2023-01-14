const { S3Client } = require("@aws-sdk/client-s3");
const config = require("../config/config");

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: config.awsS3Region,
  credentials: {
    accessKeyId: config.awsS3AccessKeyId,
    secretAccessKey: config.awsS3SecretKey,
  },
});
module.exports = { s3Client };
