const express = require("express");
const router = express.Router();
const {postContactInformation} = require("../controllers/contact.controllers")

router.post("/", postContactInformation)

module.exports = router;