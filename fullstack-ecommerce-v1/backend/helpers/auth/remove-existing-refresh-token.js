const dbConnection =
  require("../../database/get-database-connection.js").getInstance();
const config = require("../../config/config.js");

function removeExistingRefreshToken(token) {
  const sqlQuery = `DELETE FROM ${config.validRefreshTokenTableName} WHERE token = ?`;
  dbConnection.query(sqlQuery, token, (err) => {
    if (err) {
      throw Error("There was an error in the database");
    }
  });
}

module.exports = removeExistingRefreshToken;
