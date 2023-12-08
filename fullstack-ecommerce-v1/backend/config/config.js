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
  apiPort: process.env.API_PORT,
  authServerApiPort: process.env.AUTH_SERVER_API_PORT,
  productTableName: process.env.PRODUCT_TABLE_NAME,
  userTableName: process.env.USER_TABLE_NAME,
  validRefreshTokenTableName: process.env.VALID_REFRESH_TOKENS_TABLE_NAME,
  maxNumberOfProducts: process.env.MAX_NUMBER_OF_PRODUCTS,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
