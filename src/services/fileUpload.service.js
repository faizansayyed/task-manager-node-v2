const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../libs/s3Client");

/**
 * get Signed Url service
 * @param {string} imageName
 * @param {string} bucketName
 * @returns {Promise<Token>}
 */

const getSignedUrlService = async (imageName, bucketName, file) => {
  const signedUrl = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: bucketName,
      Key: imageName,
      ContentType: file.mimetype,
    }),
    { expiresIn: 120 } // 60 seconds
  );

  return signedUrl;
};

module.exports = {
  getSignedUrlService,
};
