const config = require("../config/config.js");
const db = require("../database/get-database-connection.js").getInstance();

function findNumberOfProductsInDb() {
  const sqlQuery = `SELECT COUNT(*) AS count FROM ${config.productTableName}`;
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result[0].count);
    });
  });
}

module.exports = findNumberOfProductsInDb;
