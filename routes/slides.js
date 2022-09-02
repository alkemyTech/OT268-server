const express = require('express');
const router = express.Router();
const {checkRol} = require('../middlewares/checkRol/checkRol');
const SlidesController = require('../controllers/slides.controller')

/* GET Slides listing. */
router.get('/', SlidesController.getAllSlides);
  

module.exports = router;
