const badRequest = require('../helpers/bad-request.js');
const getJWTTokens = require('../helpers/auth/get-jwt-token.js');
const db = require('../database/get-database-connection.js').getInstance();
const config = require('../config/config.js');
const bcrypt = require('bcrypt');
const wrongCredentials = require('../helpers/auth/wrong-credentials.js');
const removeExistingRefreshTokenByEmail = require('../helpers/auth/remove-existing-refresh-token-by-email.js');
const addRefreshToken = require('../helpers/auth/add-refresh-token.js');
const internalServerError = require('../helpers/internal-server-error.js');
const jwt = require('jsonwebtoken');
const getAccessToken = require('../helpers/auth/get-access-token.js');
const hasValidTokenStructure = require('../helpers/auth/has-valid-token-structure.js');
const removeExistingRefreshToken = require('../helpers/auth/remove-existing-refresh-token.js');

async function logIn(req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    return badRequest(req, res, 'The email and password are required');
  }

  const sqlQuery = `SELECT * from ${config.userTableName} WHERE email = ?`;

  db.query(sqlQuery, email, async (err, result) => {
    if (err) {
      return res.status(500).json({
        msg: 'There was an error with the database',
        success: false,
      });
    }

    if (result.length < 1) {
      return wrongCredentials(req, res);
    }

    const foundUser = result[0];

    const arePasswordsEqual = await bcrypt.compare(
      password,
      foundUser.password
    );

    try {
      removeExistingRefreshTokenByEmail(foundUser.email);
    } catch (error) {
      return internalServerError(req, res, error.msg);
    }

    if (arePasswordsEqual) {
      const jwtTokens = getJWTTokens(email);
      addRefreshToken([jwtTokens.refreshAccessToken, email]);
      return res.status(200).json({
        success: true,
        data: jwtTokens,
      });
    }

    return wrongCredentials(req, res);
  });
}

async function getNewAccessToken(req, res) {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];
  const hasValidTokenStructureVar = hasValidTokenStructure(authHeader);
  if (!hasValidTokenStructureVar) {
    return badRequest(
      req,
      res,
      "The header must contain the key 'authorization' with value that matches the pattern /Bearer .+/g"
    );
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwtRefreshSecret, (err, user) => {
    if (err) {
      removeExistingRefreshToken(token);
      return res.status(401).json({
        success: false,
        msg: 'The refresh token has already expired, please log in again',
      });
    }
    return res.status(200).json({
      success: true,
      accessToken: getAccessToken(user.email),
    });
  });
}

function verifyRefreshTokenValidity(req, res) {
  const refreshToken = req.body?.refreshToken;

  if (!refreshToken) {
    return badRequest(
      req,
      res,
      'The request has to contain a refreshToken attribute inside the body'
    );
  }

  const sqlQuery = `SELECT * from ${config.validRefreshTokenTableName} WHERE token = ?`;

  db.query(sqlQuery, refreshToken, async (err, result) => {
    if (err) {
      return internalServerError(req, res);
    }

    if (result.length < 1) {
      return res.status(401).json({
        success: false,
        msg: 'The refresh token is not valid, please log in again',
      });
    }

    jwt.verify(refreshToken, config.jwtRefreshSecret, (err) => {
      if (err) {
        removeExistingRefreshToken(refreshToken);
        return res.status(401).json({
          success: false,
          msg: 'The refresh token has already expired, please log in again',
        });
      }

      return res.status(200).json({
        success: true,
      });
    });
  });
}

function logOut(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return badRequest(
      req,
      res,
      'The request has to contain a refreshToken attribute inside the body'
    );
  }

  const sqlQuery = `DELETE from ${config.validRefreshTokenTableName} WHERE token = ?`;

  db.query(sqlQuery, refreshToken, (err) => {
    if (err) {
      return internalServerError(req, res);
    }
    return res.status(204).json();
  });
}

module.exports = {
  logIn,
  getNewAccessToken,
  verifyRefreshTokenValidity,
  logOut,
};
