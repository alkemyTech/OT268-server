const express = require("express");
const router = express.Router();
const {
  postContactInformation,
  getContactInformation,
} = require("../controllers/contact.controllers");
const {checkRol} = require("../middlewares/checkRol/checkRol");

router.post("/", postContactInformation);
router.get("/", checkRol, getContactInformation);

module.exports = router;
