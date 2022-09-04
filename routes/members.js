const express = require('express');
const { getAllMembers, createMember } = require('../controllers/members.controller');
const router = express.Router();

router.get('/', getAllMembers);
router.post('/', createMember)
module.exports = router;
