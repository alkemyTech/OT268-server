const express = require('express');
const router = express.Router();
const {checkRol} = require('../middlewares/checkRol/checkRol');
const SlidesController = require('../controllers/slides.controller')

  




//DELETE
  router.delete("/:id", checkRol, SlidesController.deleteByIdSlides);
  

module.exports = router;
