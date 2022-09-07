const express = require('express');
const router = express.Router();
const {checkRol} = require('../middlewares/checkRol/checkRol');
const SlidesController = require('../controllers/slides.controller')
const {
    getSlideList
} = require('../controllers/slides.controller');

//UPDATE
  router.put("/:id", checkRol, SlidesController.updateSlides);

/* GET Slides listing. */
router.get('/', SlidesController.getAllSlides);

//Get list Slide
router.get('/', getSlideList);

//DELETE
  router.delete("/:id", checkRol, SlidesController.deleteByIdSlides);
 

module.exports = router;
