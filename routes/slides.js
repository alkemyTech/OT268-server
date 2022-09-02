const express = require('express');
const router = express.Router();
const {
    getSlideList,
    getSlideById
} = require('../controllers/slides.controller');


router.get('/', getSlideList);
router.get('/:id', getSlideById);
router.post('/');

module.exports = router;
