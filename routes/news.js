const express = require('express');
const router = express.Router();

const NewsController = require('../controllers/news.controller');

router.get('/', NewsController.getAllNews)
router.post('/',NewsController.createNews)
router.put('/:id', NewsController.updateNews)
router.delete('/:id', NewsController.deleteNews)
// router.get('/news/:id', NewsController) * to do : get by id

module.exports = router;
