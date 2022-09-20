const express = require('express');
const {
  getAllMembers,
  createMember,
  deleteMember,
  updateMember,
} = require('../controllers/members.controller');
const { checkRol } = require('../middlewares/checkRol/checkRol');
const router = express.Router();

router.get('/', getAllMembers);
router.post('/', checkRol, createMember);
router.delete('/:id', checkRol, deleteMember);
router.put('/:id', checkRol, updateMember);
module.exports = router;
