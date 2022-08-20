var express = require('express');
var router = express.Router();
const { checkSchema } = require('../middelwares/validation/schemaValidation');

const CategoryController = require('../controllers/category.controller')
/* GET users listing. */

router.get('/', CategoryController.get);

// CREATE
router.post("/", function(req, res, next){
    const keys = ["name", "image", "description"];
    checkSchema(req,res,next,keys);
  }, CategoryController.create);
  
  // Get By Id
  router.get("/:id", CategoryController.getById);
  
  //UPDATE
  router.put("/:id", function(req, res, next){
    const keys = ["name", "image", "description"];
    checkSchema(req,res,next,keys);
  }, CategoryController.update);
  
  //DELETE
  router.delete("/:id", CategoryController.deleteById);
  

module.exports = router;
