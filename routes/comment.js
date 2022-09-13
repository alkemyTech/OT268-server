const express = require("express");
const router = express.Router();
const { uploadComment } = require("../controllers/comment.controllers");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("userId").isNumeric().withMessage("insert a valid id"),
    check("body").notEmpty().withMessage("Please enter a comment"),
    check("newsId").isNumeric().withMessage("insert a valid id"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  uploadComment
);

module.exports = router;
