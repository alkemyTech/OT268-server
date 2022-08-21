var express = require('express');
const { deleteUserByIdController } = require('../controllers/user');

var router = express.Router();


/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', deleteUserByIdController)



module.exports = router;
