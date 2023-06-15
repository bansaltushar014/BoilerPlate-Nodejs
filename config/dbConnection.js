const mongoose = require('mongoose');
const logger = require('../lib/logger');
require('dotenv').config();

let connection;

const connectMongo = async () => {
  const { MONGO_CONNECTION_STRING } = process.env;

  if (!MONGO_CONNECTION_STRING) {
    throw new Error(
      'Please define the LINKFREE_MONGO_CONNECTION_STRING environment variable (if local add to .env file)',
    );
  }

  if (connection) {
    return connection;
  }

  try {
    const options = {
      autoIndex: true,
      family: 4,
      maxPoolSize: 10,
    };
    connection = await mongoose.connect(
      MONGO_CONNECTION_STRING,
      options,
    );
    logger.info('DB connection successful:', connection.name);

    return connection;
  } catch (error) {
    logger.error('DB connection failed:', error.message);
    throw error;
  }
};

module.exports = { connectMongo };
