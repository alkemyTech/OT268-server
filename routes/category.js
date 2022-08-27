const express = require('express');
const router = express.Router();

const {checkRol, checkRolDev} = require('../middlewares/checkRol/checkRol');

const CategoryController = require('../controllers/category.controller')

/* GET users listing. */

router.get('/', checkRol, CategoryController.get);

// CREATE
router.post("/", CategoryController.create);
  
  // Get By Id
  router.get("/:id", checkRol, CategoryController.getById);
  
  //UPDATE
  router.put("/:id", CategoryController.update);
  
  //DELETE
  router.delete("/:id", CategoryController.deleteById);
  

module.exports = router;
