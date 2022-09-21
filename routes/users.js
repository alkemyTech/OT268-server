const express = require('express');
const router = express.Router();
const { adminAuthentication } = require('../middlewares/adminAuth/userAdmin');

const { register } = require('../controllers/register.controller');
const { check, validationResult } = require("express-validator");
const {
  deleteUserByIdController,
  listUsersController,
  updateUserController
} = require('../controllers/user');

/* GET users listing. */

router.get('/', listUsersController);

router.delete('/:id', deleteUserByIdController);
router.patch('/:id', updateUserController);
router.post(
  "/",
  [
    check("email").isEmail().notEmpty(),
    check('password')
      .notEmpty()
      .isLength({ min: 4 })
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
