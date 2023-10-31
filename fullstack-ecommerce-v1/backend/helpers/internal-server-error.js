function internalServerError(
  req,
  res,
  msg = "Sorry, there was a problem with the server"
) {
  return res.status(500).json({
    msg,
  });
}

module.exports = internalServerError;
