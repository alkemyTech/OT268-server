const express = require('express');
const router = express.Router();
const { checkRol } = require('../middlewares/checkRol/checkRol');


const {
    getAllNews,
    createNews,
    updateNews,
    deleteNews

} = require('../controllers/news.controller');

router.get('/', getAllNews)
router.post('/', createNews)
router.put('/:id', updateNews)
router.delete('/:id', checkRol, deleteNews)

module.exports = router;
