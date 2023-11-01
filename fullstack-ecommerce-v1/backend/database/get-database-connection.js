const config = require("../config/config.js");
const mysql = require("mysql");

const databaseConnection = (function () {
  let instance;
  function initializeConnection() {
    const db = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });

    db.connect((err) => {
      if (err) {
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
