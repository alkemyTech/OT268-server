const express = require('express');
const { getAllMembers, createMember, deleteMember } = require('../controllers/members.controller');
const router = express.Router();

router.get('/', getAllMembers);
router.post('/', createMember)
router.delete('/:id', deleteMember)
module.exports = router;
