const config = require("../../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

function getJWTTokens(email) {
  const SECRET = config.jwtSecret;
  const REFRESH_SECRET = config.jwtRefreshSecret;
  const accessToken = jsonwebtoken.sign({ email }, SECRET, {
    expiresIn: "15m",
  });
  const refreshAccessToken = jsonwebtoken.sign({ email }, REFRESH_SECRET, {
    expiresIn: "8h",
  });
  return { accessToken, refreshAccessToken };
}

module.exports = getJWTTokens;
