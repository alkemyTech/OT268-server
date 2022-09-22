const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const ContactController = require("../controllers/contacts.controller");
const { checkRol } = require("../middlewares/checkRol/checkRol");

router.post(
  "/",
  [
  
    check("email").isEmail().notEmpty(),
    check('name')
      .notEmpty()
      .isLength({ min: 3 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  ContactController.postContactInformation
);

router.get("/", checkRol, ContactController.getContactInformation);

module.exports = router;
