const express = require("express");
const mysql = require("mysql");
const config = require("./config/config.js");
const productRouter = require("./routes/product.route.js");
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

db.connect((err) => {
  console.log(err ? "There was an error" : "Successfull database connection");
});

const routes = {
  products: "/api/products",
};

app.listen(config.apiPort, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Aplication open on port: ${config.apiPort}`);
  useRoutes();
});

function useRoutes() {
  app.use(routes.products, productRouter);
}
