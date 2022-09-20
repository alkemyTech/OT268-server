const express = require('express');
const router = express.Router();
const { adminAuthentication } = require('../middlewares/adminAuth/userAdmin');

const { register } = require('../controllers/register.controller');
const { check, validationResult } = require('express-validator');
const {
  deleteUserByIdController,
  listUsersController,
  updateUserController,
} = require('../controllers/user');

const { checkRol } = require('../middlewares/checkRol/checkRol');

/* GET users listing. */

router.get('/', checkRol, listUsersController);

router.delete('/:id', checkRol, deleteUserByIdController);
router.patch('/:id', checkRol, updateUserController);
router.post(
  '/',
  checkRol,
  [
    check('email').isEmail().notEmpty(),
    check('password').notEmpty().isLength({ min: 4 }),
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
