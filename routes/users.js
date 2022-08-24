
var express = require("express");
var router = express.Router();

const { register } = require("../controllers/register.controller");


const { deleteUserByIdController } = require('../controllers/user');




/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', deleteUserByIdController)



router.route("/auth/register").post(register);

module.exports = router;