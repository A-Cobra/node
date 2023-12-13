const dbConnection =
  require("../../database/get-database-connection.js").getInstance();
const config = require("../../config/config.js");

function removeExistingRefreshTokenByEmail(email) {
  const sqlQuery = `DELETE FROM ${config.validRefreshTokenTableName} WHERE email = ?`;
  dbConnection.query(sqlQuery, email, (err) => {
    if (err) {
      throw Error("There was an error in the database");
    }
  });
}

module.exports = removeExistingRefreshTokenByEmail;
