const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { logIn } = require('../controllers/auth.controller');

router.post(
  '/login',
  [
    check('email').notEmpty().isEmail().withMessage({ ok: false }),
    check('password')
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage({ ok: false }),
  ],
  logIn
);

module.exports = router;
