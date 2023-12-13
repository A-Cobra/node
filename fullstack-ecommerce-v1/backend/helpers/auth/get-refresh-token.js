const config = require("../../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

function getRefreshToken(email) {
  const REFRESH_SECRET = config.jwtRefreshSecret;
  return jsonwebtoken.sign({ email }, REFRESH_SECRET, {
    expiresIn: "8h",
  });
}

module.exports = getRefreshToken;
