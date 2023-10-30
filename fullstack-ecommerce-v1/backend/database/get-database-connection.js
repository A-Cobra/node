const config = require("../config/config.js");
const mysql = require("mysql");

const databaseConnection = (function () {
  let instance;
  function initializeConnection() {
    console.log("Creating new connection");
    const db = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });

    db.connect((err) => {
      if (err) {
        console.log("\n\n\n\nERROR CONENCTING DATABASEn\n\n\n");
        console.log(err);
        throw new Error("Database connection unsuccessful");
      }
    });
    return db;
  }
  return {
    getInstance() {
      if (!instance) {
        try {
          instance = initializeConnection();
        } catch (error) {
          throw error;
        }
      }
      return instance;
    },
  };
})();

module.exports = databaseConnection;
