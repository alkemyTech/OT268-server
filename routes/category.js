const express = require('express');
const router = express.Router();

const {checkRol, checkRolDev} = require('../middlewares/checkRol/checkRol');

const CategoryController = require('../controllers/category.controller')

/* GET users listing. */

router.get('/', checkRol, CategoryController.getAllCategory);

// CREATE
router.post("/", CategoryController.createCategory);
  
  // Get By Id
  router.get("/:id", checkRol, CategoryController.getByIdCategory);
  
  //UPDATE
  router.put("/:id", CategoryController.updateCategory);
  
  //DELETE
  router.delete("/:id", CategoryController.deleteByIdCategory);
  

module.exports = router;
