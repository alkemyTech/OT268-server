const express = require('express');
const router = express.Router();
const {
    getListSlide
} = require('../controllers/slides.controller');


router.get('/', getListSlide);
router.get('/:id');
router.post('/');

module.exports = router;
