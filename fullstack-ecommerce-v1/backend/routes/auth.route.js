const { logIn, getNewAccessToken } = require("../controllers/auth.controller");

const Router = require("express").Router;

const router = Router();

router.post("/log-in", logIn);

router.post("/access-token", getNewAccessToken);

module.exports = router;
