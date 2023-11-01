const express = require("express");
const config = require("./config/config.js");
const productsRouter = require("./routes/products.route.js");
let dbConnection;

try {
  dbConnection = require("./database/get-database-connection.js").getInstance();
} catch (error) {
  console.log(error);
  process.exit(0);
}

const app = express();
app.use(express.json());

const routes = {
  products: "/api/products",
};

app.listen(config.apiPort, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Application open on port: ${config.apiPort}`);
  useRoutes();
});

function useRoutes() {
  app.use(routes.products, productsRouter);
}
