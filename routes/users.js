const express = require("express");
const router = express.Router();
const {newToken} = require('../middlewares/jsonwebtoken/jwt') 

const { register } = require("../controllers/register.controller");

const { deleteUserByIdController } = require("../controllers/user");
const { logIn } = require("../controllers/auth.controller");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.delete("/:id", deleteUserByIdController);
router.patch('/:id', updateUserController)
router.post("/auth/register", register);

module.exports = router;
