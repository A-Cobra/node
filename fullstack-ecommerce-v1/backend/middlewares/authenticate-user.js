const badRequest = require('../helpers/bad-request');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const hasValidTokenStructure = require('../helpers/auth/has-valid-token-structure.js');
const getAccessToken = require('../helpers/auth/get-access-token.js');

function authenticateUser(req, res, next) {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];
  const hasValidStructure = hasValidTokenStructure(authHeader);
  if (!hasValidStructure) {
    return badRequest(
      req,
      res,
      "The header must contain the key 'authorization' with value that matches the pattern /Bearer .+/g"
    );
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      const refreshToken = req.body?.refreshToken;
      if (refreshToken) {
        let requestInformation = {};
        jwt.verify(refreshToken, config.jwtRefreshSecret, (err, user) => {
          if (err) {
            requestInformation = {
              ...requestInformation,
              expiredRefreshToken: true,
            };
          } else {
            const newAccessToken = getAccessToken(user.email);
            requestInformation = {
              ...requestInformation,
              accessToken: newAccessToken,
            };
          }
        });
        return res.status(401).json({ ...requestInformation });
      }

      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateUser;
