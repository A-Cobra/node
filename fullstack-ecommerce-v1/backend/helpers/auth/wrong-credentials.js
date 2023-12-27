function wrongCredentials(
  req,
  res,
  msg = "Sorry, the credentials are incorrect, please try again"
) {
  return res.status(401).json({
    msg,
  });
}

module.exports = wrongCredentials;
