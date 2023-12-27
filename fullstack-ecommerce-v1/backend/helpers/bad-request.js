function badRequest(
  req,
  res,
  msg = "Sorry, there are attributes missing on the request"
) {
  return res.status(400).json({
    msg,
  });
}

module.exports = badRequest;
