const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

async function connect() {
  mongoose.set("strictQuery", false);
  if (!config.MONGODB_URI) {
    throw new Error("MongoDB URI is missing, please define DB_URL");
  }

  await mongoose.connect(config.MONGODB_URI, {});
  logger.info("Connected to mongodb");
}

const disconnect = async () => {
  try {
    await mongoose.connection.close();
    logger.info("disconnected from MongoDB");
  } catch (error) {
    logger.error("error disconnecting from MongoDB:", error.message);
  }
};

module.exports = { connect, disconnect };
