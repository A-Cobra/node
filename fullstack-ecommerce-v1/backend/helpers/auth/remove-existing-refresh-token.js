const dbConnection =
  require("../../database/get-database-connection.js").getInstance();
const config = require("../../config/config.js");

function removeExistingRefreshToken(email) {
  const sqlQuery = `DELETE FROM ${config.validRefreshTokenTableName} WHERE email = ?`;
  dbConnection.query(sqlQuery, email, (err, res) => {
    if (err) {
      console.log("err deleting row");
      console.log(err);
      return;
    }
    console.log("res");
    console.log(res);
  });
}

module.exports = removeExistingRefreshToken;
