const express = require('express');
const router = express.Router();
const {checkRol} = require('../middlewares/checkRol/checkRol');
const SlidesController = require('../controllers/slides.controller')

  















//UPDATE
  router.put("/:id", checkRol, SlidesController.updateCategory);
  

module.exports = router;
