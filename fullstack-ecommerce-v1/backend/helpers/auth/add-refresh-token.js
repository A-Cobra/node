const dbConnection =
  require('../../database/get-database-connection.js').getInstance();
const config = require('../../config/config.js');

function addRefreshToken(payload) {
  const sqlQuery = `INSERT INTO ${config.validRefreshTokenTableName} (token, email) VALUES (?, ?)`;
  dbConnection.query(sqlQuery, payload, (err) => {
    if (err) {
      console.log('There was an error inserting the token to the database');
    }
  });
}

module.exports = addRefreshToken;
