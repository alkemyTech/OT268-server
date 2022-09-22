const express = require('express');
const router = express.Router();
const { checkRol } = require('../middlewares/checkRol/checkRol');

const CommentsController = require('../controllers/comments.controller');
const { check, validationResult } = require("express-validator");

/* GET users listing. */

router.get('/', checkRol, CommentsController.getAllComments);
router.get('/post/:id/comments', checkRol, CommentsController.getCommentsByPostId);
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
    CommentsController.uploadComment
  );
router.put('/:id', checkRol, CommentsController.updateComments);
router.delete('/:id', CommentsController.deleteComment)
module.exports = router;
