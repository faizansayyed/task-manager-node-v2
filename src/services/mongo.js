const mongoose = require("mongoose");

// Update below to match your own MongoDB connection string.
const NODE_MONGO_URI = process.env.NODE_MONGO_URI;

mongoose.set('strictQuery', false);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(NODE_MONGO_URI);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
