const config = require("../../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

function getJWTToken(email, password) {
  const SECRET = config.jwtSecret;
  return jsonwebtoken.sign({ email, password }, SECRET, {
    expiresIn: 1000 * 60 * 30,
  });
}

module.exports = getJWTToken;
