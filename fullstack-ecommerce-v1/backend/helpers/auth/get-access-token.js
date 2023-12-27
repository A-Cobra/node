const config = require("../../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

function getAccessToken(email) {
  const SECRET = config.jwtSecret;
  return jsonwebtoken.sign({ email }, SECRET, {
    expiresIn: "15m",
  });
}

module.exports = getAccessToken;
