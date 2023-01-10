const mongoose = require("mongoose");
const redis = require("redis");
const config = require("../config/config");
const logger = require("../config/logger");

let redisClient;

(async () => {
  try {
    redisClient = redis.createClient(config.redisUrl);

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
  } catch (error) {
    console.log({ error });
  }
})();

redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    ...{
      collection: this.mongooseCollection.name,
    },
  });

  // See if we have a value for 'key' in redis
  const cacheValue = await redisClient.hGet(this.hashKey, key);
  // If we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  redisClient.hSet(this.hashKey, key, JSON.stringify(result), "EX", 10);

  return result;
};

module.exports = {
  clearHash(hashKey) {
    redisClient.del(JSON.stringify(hashKey));
  },
};
