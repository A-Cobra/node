const getAccessToken = require("./get-access-token.js");
const getRefreshToken = require("./get-refresh-token.js");

function getJWTTokens(email) {
  const accessToken = getAccessToken(email);
  const refreshAccessToken = getRefreshToken(email);
  return { accessToken, refreshAccessToken };
}

module.exports = getJWTTokens;
