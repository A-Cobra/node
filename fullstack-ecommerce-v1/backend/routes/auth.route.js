const {
  logIn,
  getNewAccessToken,
  verifyRefreshTokenValidity,
} = require('../controllers/auth.controller');

const Router = require('express').Router;

const router = Router();

router.post('/log-in', logIn);

router.post('/get-access-token', getNewAccessToken);

router.post('/verify-refresh-token', verifyRefreshTokenValidity);

module.exports = router;
