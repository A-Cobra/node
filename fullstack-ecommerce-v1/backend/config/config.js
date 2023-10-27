const dotenv = require("dotenv");

try {
  dotenv.config();
} catch (error) {
  throw new Error("Env file not found");
}

module.exports = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
