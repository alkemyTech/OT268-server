const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {checkRol, checkRolDev} = require('../middlewares/checkRol/checkRol');

const CategoryController = require('../controllers/category.controller')

/* GET users listing. */

router.get('/', checkRol, CategoryController.get);

// CREATE
router.post("/",
  [check('name').notEmpty().withMessage({ ok: false , err: "Name can't be empty"}).isAlpha().withMessage({ ok: false , message: "Name must be alpha only"})],
  checkRol,
  CategoryController.create);
  
  // Get By Id
  router.get("/:id", checkRol, CategoryController.getById);
  
  //UPDATE
  router.put("/:id", CategoryController.update);
  
  //DELETE
  router.delete("/:id", CategoryController.deleteById);
  

module.exports = router;
