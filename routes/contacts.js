const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const {
  postContactInformation,
  getContactInformation,
} = require("../controllers/contacts.controller");
const { checkRol } = require("../middlewares/checkRol/checkRol");

router.post(
  "/",
  [
    check("email").isEmail().notEmpty(),
    check('name')
      .notEmpty()
      .isLength({ min: 4 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  postContactInformation
);

router.get("/",  getContactInformation);

module.exports = router;
