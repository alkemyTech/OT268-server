const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { logIn } = require('../controllers/auth.controller');
const {newToken, authJWT} = require('../middlewares/jsonwebtoken/jwt')

router.post(
  '/login',
  [
    check('email').notEmpty().isEmail().withMessage({ ok: false }),
    check('password')
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage({ ok: false }),
  ],
  logIn, 
  newToken
);
router.get('/me', authJWT)
module.exports = router;
