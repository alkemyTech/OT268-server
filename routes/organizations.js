var express = require('express');
const { getOrganizationController } = require('../controllers/organization');
var router = express.Router();

/* GET organizations listing. */
router.get('/', getOrganizationController);

module.exports = router;
