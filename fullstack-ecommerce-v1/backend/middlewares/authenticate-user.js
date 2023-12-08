const badRequest = require("../helpers/bad-request");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

function authenticateUser(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const bearerRegex = /Bearer .+/g;
  const hasValidTokenStructure = authHeader && authHeader.match(bearerRegex);
  if (!hasValidTokenStructure) {
    return badRequest(
      req,
      res,
      "The header must contain the key 'authorization' with value that matches the pattern /Bearer .+/g"
    );
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateUser;
