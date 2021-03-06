const dotenv = require("dotenv");

const init = () => {
  dotenv.config(); // Load configurations from .env file

  return {
    MONGO_URL: process.env.MONGO_URL,

    // Web server port
    server: {
      port: process.env.PORT || 8080,
    },

    env: process.env.ENV, // production || test || production

    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB,
      password: process.env.REDIS_PASSWORD,
    },
  };
};

exports.init = init;
