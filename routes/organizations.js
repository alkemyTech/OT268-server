const express = require('express');
const {
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization } = require('../controllers/organization');
const { checkRol } = require('../middlewares/checkRol/checkRol');
const router = express.Router();

/* GET organizations listing. */

router.get('/public', checkRol, getOrganization);
router.post('/pulic', checkRol, createOrganization);
router.put('/pulic/:id', checkRol, updateOrganization);
router.delete('/pulic/:id', checkRol, deleteOrganization);

module.exports = router;
