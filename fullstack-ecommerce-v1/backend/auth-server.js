const express = require('express');
const config = require('./config/config.js');
const authRouter = require('./routes/auth.route.js');
const cors = require('cors');
const CORS_CONFIG = require('./utils/cors-config.js');
let dbConnection;

try {
  dbConnection = require('./database/get-database-connection.js').getInstance();
} catch (error) {
  console.log(error);
  process.exit(0);
}

const app = express();
app.use(express.json());
app.use(cors(CORS_CONFIG));

const routes = {
  auth: '/api/auth',
};

app.listen(config.authServerApiPort, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Application open on port: ${config.authServerApiPort}`);
  useRoutes();
});

function useRoutes() {
  app.use(routes.auth, authRouter);
}
