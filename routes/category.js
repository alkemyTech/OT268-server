var express = require('express');
var router = express.Router();
const { checkSchema } = require('../middelwares/validation/schemaValidation');

const CategoryController = require('../controllers/category.controller')
/* GET users listing. */

router.get('/', CategoryController.get);

// CREATE
AreaRouter.post("/", function(req, res, next){
    const keys = ["name", "image", "description"];
    checkSchema(req,res,next,keys);
  }, AreaController.create);
  
  // Get By Id
  AreaRouter.get("/:id", AreaController.getById);
  
  //UPDATE
  AreaRouter.put("/:id",  AreaController.update);
  
  //DELETE
  AreaRouter.delete("/:id", AreaController.deleteById);
  

module.exports = router;
