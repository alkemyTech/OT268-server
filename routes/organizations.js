const express = require('express');
const {
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization } = require('../controllers/organization');
const { checkRol } = require('../middlewares/checkRol/checkRol');
const router = express.Router();

/* GET organizations listing. */

router.get('/', getOrganization);
router.post('/public',  createOrganization);
router.put('/public/:id', checkRol, updateOrganization);
router.delete('/public/:id', checkRol, deleteOrganization);

module.exports = router;
