var express = require('express');
var router = express.Router();

const { adminAuthentication } = require('../middlewares/adminAuth/userAdmin');

const CategoryController = require('../controllers/category.controller');
/* GET users listing. */

router.use(adminAuthentication);

router.get('/', CategoryController.get);

// CREATE
router.post('/', CategoryController.create);

// Get By Id
router.get('/:id', CategoryController.getById);

//UPDATE
router.put('/:id', CategoryController.update);

//DELETE
router.delete('/:id', CategoryController.deleteById);

module.exports = router;
