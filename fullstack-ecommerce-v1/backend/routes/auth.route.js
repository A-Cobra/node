const {
  logIn,
  getNewAccessToken,
  verifyRefreshTokenValidity,
  logOut,
} = require('../controllers/auth.controller');

const Router = require('express').Router;

const router = Router();

router.post('/log-in', logIn);

router.post('/get-access-token', getNewAccessToken);

router.post('/verify-refresh-token', verifyRefreshTokenValidity);

router.delete('/log-out', logOut);

module.exports = router;
