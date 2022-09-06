const express = require('express');
const router = express.Router();

const { checkRol } = require('../middlewares/checkRol/checkRol');

const { listContacts } = require('../controllers/contacts.controller');

router.get('/contacts', checkRol, listContacts);

module.exports = router;
