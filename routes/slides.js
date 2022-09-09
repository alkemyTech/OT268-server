const express = require('express');
const router = express.Router();
const {checkRol} = require('../middlewares/checkRol/checkRol');
const SlidesController = require('../controllers/slides.controller')
const imageUploader = require('../helpers/imageUploader');
const {
  getSlideById,
  getSlideList,
  creationSlide,
  upload
} = require('../controllers/slides.controller');

//UPDATE
  router.put("/:id", checkRol, SlidesController.updateSlides);

/* GET Slides listing. */
router.get('/', SlidesController.getAllSlides);

//Get list Slide
router.get('/',checkRol, getSlideList);

//DELETE
  router.delete("/:id", checkRol, SlidesController.deleteByIdSlides);

// Obtener detalles mediante get ID
router.get('/:id', getSlideById);

// Crear Slide
router.post('/',imageUploader.upload.single('imageUrl') ,creationSlide);

module.exports = router;
