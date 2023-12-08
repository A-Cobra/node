const dbConnection =
  require("../../database/get-database-connection.js").getInstance();
const config = require("../../config/config.js");

function addRefreshToken(payload) {
  // payload = [refreshToken, email]
  const sqlQuery = `INSERT INTO ${config.validRefreshTokenTableName} (token, email) VALUES (?, ?)`;
  dbConnection.query(sqlQuery, payload, (err, res) => {
    if (err) {
      console.log("err deleting row");
      console.log(err);
      return;
    }
    console.log("res");
    console.log(res);
  });
}

module.exports = addRefreshToken;
