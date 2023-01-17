const redis = require("redis");
const config = require("../config/config");

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient(config.redisUrl);

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
  } catch (error) {
    console.log({ error });
  }
};

redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});

module.exports = redisClient;
