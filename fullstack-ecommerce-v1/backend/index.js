const express = require("express");
const mysql = require("mysql");
const config = require("./config/config.js");
const app = express();
app.use(express.json());

// console.log(config);
const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

db.connect((err) => {
  console.log(err ? "There was an error" : "Successfull database connection");
});
