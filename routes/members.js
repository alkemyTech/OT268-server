const express = require('express');
const { getAllMembers, createMember, deleteMember, updateMember } = require('../controllers/members.controller');
const router = express.Router();

router.get('/', getAllMembers);
router.post('/', createMember)
router.delete('/:id', deleteMember)
router.put('/:id', updateMember)
module.exports = router;
