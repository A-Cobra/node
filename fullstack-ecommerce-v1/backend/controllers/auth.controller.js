const badRequest = require("../helpers/bad-request.js");
const getJWTToken = require("../helpers/auth/get-jwt-token.js");
const db = require("../database/get-database-connection.js").getInstance();
const config = require("../config/config.js");
const bcrypt = require("bcrypt");
const wrongCredentials = require("../helpers/auth/wrong-credentials.js");

async function logIn(req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    return badRequest(req, res, "The email and password are required");
  }

  const sqlQuery = `SELECT * from ${config.userTableName} WHERE email = ?`;

  db.query(sqlQuery, email, async (err, result) => {
    if (err) {
      return res.status(500).json({
        msg: "There was an error with the database",
        success: false,
      });
    }

    if (result.length < 1) {
      return wrongCredentials(req, res);
    }

    const foundUser = result[0];

    const arePasswordsEqual = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (arePasswordsEqual) {
      return res.status(200).json({
        success: true,
        data: getJWTToken(email),
      });
    }

    return wrongCredentials(req, res);
  });
}

module.exports = { logIn };
