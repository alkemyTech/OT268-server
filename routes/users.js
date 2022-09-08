const express = require("express");
const router = express.Router();

const { register } = require("../controllers/register.controller");

const { deleteUserByIdController, updateUserController } = require("../controllers/user");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.delete("/:id", deleteUserByIdController);
router.patch('/:id', updateUserController)
router.post("/auth/register", register);

module.exports = router;
