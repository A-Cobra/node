const config = require("../../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

function getJWTToken(email) {
  const SECRET = config.jwtSecret;
  return jsonwebtoken.sign({ email }, SECRET, {
    expiresIn: "30m",
  });
}

module.exports = getJWTToken;
