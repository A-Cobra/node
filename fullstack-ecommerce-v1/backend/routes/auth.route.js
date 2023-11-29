const { logIn } = require("../controllers/auth.controller");

const Router = require("express").Router;

const router = Router();

router.post("/log-in", logIn);

module.exports = router;
