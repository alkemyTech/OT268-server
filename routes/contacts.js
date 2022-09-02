const express = require("express");
const router = express.Router();
const {postContactInformation, getContactInformation} = require("../controllers/contact.controllers")

router.post("/", postContactInformation)
router.get("/", getContactInformation)

module.exports = router;