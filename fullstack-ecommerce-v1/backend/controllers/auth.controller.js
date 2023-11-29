const badRequest = require("../helpers/bad-request.js");
const getJWTToken = require("../helpers/auth/get-jwt-token.js");

function logIn(req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    return badRequest(req, res, "The email and password are required");
  }

  // TODO: find record in database

  return res.status(200).json({
    success: true,
    data: getJWTToken(email, password),
  });
}

module.exports = { logIn };
