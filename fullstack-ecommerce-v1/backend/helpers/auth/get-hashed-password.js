const bcrypt = require("bcrypt");

async function getHashedPassword(password, rounds = 10) {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
}

module.exports = getHashedPassword;
