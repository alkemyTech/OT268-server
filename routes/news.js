const express = require('express');
const router = express.Router();
const { checkRol } = require('../middlewares/checkRol/checkRol');

const {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/news.controller');

router.get('/', checkRol, getAllNews);
router.post('/', checkRol, createNews);
router.put('/:id', checkRol, updateNews);
router.delete('/:id', checkRol, deleteNews);

module.exports = router;
