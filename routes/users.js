const express = require('express');
const router = express.Router();
const { adminAuthentication } = require('../middlewares/adminAuth/userAdmin');

const { register } = require('../controllers/register.controller');

const { deleteUserByIdController, updateUserController } = require("../controllers/user");
const { check, validationResult } = require("express-validator");
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.delete("/:id", deleteUserByIdController);
router.patch('/:id', updateUserController)
router.post(
  "/",
  [
    check("email").isEmail().notEmpty(),
    check('password')
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage({ ok: false }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  register
);

module.exports = router;
