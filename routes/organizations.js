const express = require('express');
const { getOrganizationController } = require('../controllers/organization');
const router = express.Router();

/* GET organizations listing. */
router.get('/', getOrganizationController);

module.exports = router;
