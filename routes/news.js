const express = require('express');
const router = express.Router();

const {
    getAllNews,
    createNews,
    updateNews,  
    deleteNews

} = require('../controllers/news.controller');

router.get('/',  getAllNews)
router.post('/', createNews)
router.put('/:id',  updateNews)
router.delete('/:id',  deleteNews)

module.exports = router;
