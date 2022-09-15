const express = require('express');
const router = express.Router();

const { checkRol } = require('../middlewares/checkRol/checkRol');

const CommentsController = require('../controllers/comments.controller');
const { deleteComment } = require('../controllers/comment.controllers');

/* GET users listing. */

router.get('/', checkRol, CommentsController.getAllComments);
router.delete('/:id', deleteComment)