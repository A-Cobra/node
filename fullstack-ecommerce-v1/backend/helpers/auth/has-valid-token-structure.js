function hasValidTokenStructure(authHeader) {
  const bearerRegex = /Bearer .+/g;
  return authHeader && authHeader.match(bearerRegex);
}
module.exports = hasValidTokenStructure;
