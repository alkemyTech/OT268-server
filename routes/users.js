var express = require("express");
var router = express.Router();

const { register } = require("../controllers/register.controller");

router.route("/auth/register").post(register);

module.exports = router;
